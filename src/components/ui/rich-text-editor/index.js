import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import PluginsEditor from "draft-js-plugins-editor";
import Emitter from "component-emitter";
import { belongsToAtomicBlockOrPortal } from "./utils";
import capitalize from "../../../utils/capitalize";

// Plugins
import createAutoListPlugin from "draft-js-autolist-plugin";
import createBlockBreakoutPlugin from "draft-js-block-breakout-plugin";
import createSingleLinePlugin from "draft-js-single-line-plugin";
import createBlockToolbarPlugin from "./block-toolbar-plugin";
import createInlineToolbarPlugin from "./inline-toolbar-plugin";
import createSoftNewlinesKeyboardPlugin from "./soft-newlines-keyboard-plugin";
// Styles
import * as styles from "./styles";
import "./tmp.css";

/**
 * Rich Text Editor
 */
class RichTextEditor extends React.Component {
  static propTypes = {
    embeddableForms: PropTypes.object,
    embeddableFormsPrefix: PropTypes.string,
    blockFormatters: PropTypes.array,
    boxSize: PropTypes.string,
    config: PropTypes.object,
    inlineFormatters: PropTypes.array,
    editorState: PropTypes.object.isRequired,
    fieldBus: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    webDriverTestID: PropTypes.string
  };

  static defaultProps = {
    placeholder: "Start writing …"
  };

  state = {
    someProp: Date.now(),
    hasFocus: false
  };

  componentWillMount() {
    // Create a per-instance event emitter to pass through to the atomic blocks
    // so that we can subscribe to `onChange` events in the editor proper
    // This is not really great, but there’s no way for this to get
    // passed down through props atm
    this.emitter = new Emitter();
    // Atomic blocks trigger an `atomic:change` event when they update their
    // embedded entity data. We have to listen to it and trigger an `onChange`
    // of the current data to get things to propagate around _immediately_.
    this.emitter.on("atomic:change", () => {
      const { editorState } = this.props;
      const forceChange = true;
      this.onChange(editorState, forceChange);
    });

    const plugins = this.configurePlugins();
    this.setState({
      plugins
    });
  }

  /**
   * Handle the configuration of the various plugins we allow to pass in
   * @return {Array} List of draft-js-plugins compatible plugins
   */
  configurePlugins = () => {
    const {
      blockFormatters,
      boxSize,
      config,
      embeddableForms,
      embeddableFormsPrefix,
      fieldBus,
      inlineFormatters
    } = this.props;

    // Extract config for each type of toolbar
    const { block, inline } = config;

    const autoListPlugin = createAutoListPlugin();
    const singleLinePlugin = createSingleLinePlugin();

    // Configure the blockToolbarPlugin
    // Pass through any
    this.blockToolbarPlugin = createBlockToolbarPlugin({
      setReadOnly: this.setReadOnly,
      editorEmitter: this.emitter,
      blockFormatters,
      embeddableForms,
      embeddableFormsPrefix,
      fieldBus,
      ...block
    });
    const inlineToolbarPlugin = createInlineToolbarPlugin({
      allowedFormatters: inlineFormatters,
      ...inline
    });
    // Build up the list of plugins
    let plugins = [
      inlineToolbarPlugin,
      createBlockBreakoutPlugin(),
      createSoftNewlinesKeyboardPlugin()
    ];
    // Add singleLine plugin if the boxSize matches
    if (boxSize === "single") {
      plugins = plugins.concat([singleLinePlugin]);
    } else {
      plugins = plugins.concat([autoListPlugin, this.blockToolbarPlugin]);
    }
    // Extract the toolbar component for use in rendering
    this.BlockToolbar = this.blockToolbarPlugin.BlockToolbar;
    this.blockRenderMap = this.blockToolbarPlugin.blockRenderMap;
    this.InlineToolbar = inlineToolbarPlugin.InlineToolbar;
    return plugins;
  };

  onFocus = e => {
    const { editorState } = this.props;
    this.emitter.emit("focus", editorState);
    this.setState({ hasFocus: true });
  };

  onBlur = e => {
    const { editorState } = this.props;
    this.emitter.emit("blur", editorState);
    this.setState({ hasFocus: false });
  };

  /**
   * Set the editor to read-only (or not)
   * @param {Boolean} readOnly
   */
  setReadOnly = readOnly => {
    this.setState({ readOnly });
  };

  /**
   * Focus the editor when the `contentEl` is clicked
   * @param  {MouseEvent} e
   */
  onContentClick = e => {
    const atomic = belongsToAtomicBlockOrPortal(e.target);
    if (!atomic && this.state.readOnly === true) {
      this.setReadOnly(false);
    }
    if (e.target === this.contentEl) {
      this._editor.focus();
    }
  };

  /**
   * onChange
   */
  onChange = (editorState, forceChange = false) => {
    forceChange = forceChange === true ? true : false;
    if (forceChange || editorState !== this.props.editorState) {
      const { onChange } = this.props;
      // eslint-disable-next-line no-unused-expressions
      onChange(editorState, forceChange);
      this.emitter.emit("change", editorState);
    }
  };

  render() {
    const {
      boxSize,
      blockFormatters,
      editorState,
      placeholder,
      webDriverTestID
    } = this.props;
    const { hasFocus, readOnly } = this.state;
    const { BlockToolbar, InlineToolbar } = this;

    let placeholderBlockType = false;
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      placeholderBlockType = contentState
        .getBlockMap()
        .first()
        .getType();
    }

    // Set up content wrapper classes
    let contentClassNames = classNames(styles.content, {
      [`${styles["contentPlaceholder" + capitalize(placeholderBlockType)]}`]:
        placeholderBlockType &&
        styles["contentPlaceholder" + capitalize(placeholderBlockType)]
    });

    // TODO Asses whether to remove this binding
    /* eslint-disable react/jsx-no-bind */
    return (
      <div className={styles.base}>
        {boxSize !== "single" ? (
          <div className={styles.gutter}>
            <BlockToolbar
              blockFormatters={blockFormatters}
              editorHasFocus={hasFocus}
              editorState={editorState}
              onChange={this.onChange}
            />
          </div>
        ) : null}
        <div
          className={contentClassNames}
          ref={c => {
            this.contentEl = c;
          }}
          onClick={this.onContentClick}
        >
          <InlineToolbar
            editorHasFocus={hasFocus}
            editorState={editorState}
            onChange={this.onChange}
          />
          <PluginsEditor
            ref={c => {
              this._editor = c;
            }}
            blockRenderMap={this.blockRenderMap}
            placeholder={placeholder}
            plugins={this.state.plugins}
            editorState={editorState}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChange={this.onChange}
            readOnly={readOnly}
            webDriverTestID={webDriverTestID}
          />
        </div>
      </div>
    );
    /* eslint-enable react/jsx-no-bind */
  }
}

export default RichTextEditor;
