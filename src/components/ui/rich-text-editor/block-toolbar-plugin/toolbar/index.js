import React, { Component } from "react";
import PropTypes from "prop-types";
import { RichUtils } from "draft-js";
// Components
import Popout from "../../../popout";
import BlockItems from "../block-items";
import FormItems from "../form-items";
// Styles
import * as styles from "./styles";

/**
 * Block Toolbar
 *
 */
class BlockToolbar extends Component {
  static propTypes = {
    blockItemsGroups: PropTypes.array,
    editableBlockTypes: PropTypes.array,
    embeddableForms: PropTypes.object,
    editorHasFocus: PropTypes.bool.isRequired,
    editorState: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  };

  state = {
    open: false
  };

  componentWillMount() {
    window.addEventListener("keydown", this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeyDown);
  }

  /**
   * Handle position and visibility of the toolbar
   */
  componentWillReceiveProps(nextProps) {
    // We have to wait a tick to calculate the position
    window.requestAnimationFrame(() => {
      this.setState({
        positionStyle: this.calculatePosition()
      });
    });
  }

  /**
   * Calculate the position of the toolbar based on the visible selection
   * and the position of the `positioner`s offsetParent.
   *
   * @return {Object} Description of the position/size of the positioner
   */
  calculatePosition = () => {
    const { editorState } = this.props;
    const selection = editorState.getSelection();
    const selectedBlockKey = selection.getStartKey();
    const selectedBlock = document.querySelector(
      `[data-block][data-offset-key^='${selectedBlockKey}']`
    );
    if (selectedBlock && this._positioner) {
      const blockRect = selectedBlock.getBoundingClientRect();
      const positionerParentRect = this._positioner.offsetParent.getBoundingClientRect();
      return {
        top: Math.floor(blockRect.top - positionerParentRect.top - 8)
      };
    }
    return {};
  };

  onKeyDown = e => {
    this.closeToolbar();
  };

  openToolbar = () => {
    this.setState({
      open: true
    });
  };

  closeToolbar = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const {
      blockItemsGroups,
      editableBlockTypes,
      editorState,
      embeddableForms,
      onChange
    } = this.props;
    const { open, positionStyle } = this.state;
    const currentBlockType = RichUtils.getCurrentBlockType(editorState);

    // Suck out our forms into a slightly friendly format
    let embeddableFormsButtons = [];
    if (embeddableForms) {
      embeddableFormsButtons = Object.keys(embeddableForms).sort().map(identifier => {
        const form = embeddableForms[identifier];
        return Object.assign({}, form, { name: identifier });
      });
    }

    // Extract the icon for the active block
    const activeBlockItem = blockItemsGroups
      .reduce((a, b) => a.concat(b), [])
      .find(item => {
        return item.type === currentBlockType;
      });

    let popoutOffset = {
      default: 10
    }

    // Add horizontal offset to popout when embeddable forms are present
    if (embeddableFormsButtons.length > 0) {
      popoutOffset.horz = 50;
    }

    // TODO Asses whether to remove this binding
    /* eslint-disable react/jsx-no-bind */
    return (
      <div>
        <Popout
          placement="bottom"
          offset={popoutOffset}
          isOpened={open}
          closeOnOutsideClick
          closeOnEsc
          onClose={this.closeToolbar}
        >
          <div
            style={positionStyle}
            className={styles.positioner}
            ref={r => {
              this._positioner = r;
            }}
          >
            {currentBlockType !== "atomic" ? (
              <button
                className={styles.toggle}
                onClick={e => {
                  e.preventDefault();
                  this.openToolbar();
                }}
                onMouseDown={e => e.preventDefault()}
              >
                {activeBlockItem && activeBlockItem.icon ? (
                  <span
                    title={activeBlockItem.label}
                    className={styles.iconWrapper}
                    dangerouslySetInnerHTML={{ __html: activeBlockItem.icon }}
                  />
                ) : activeBlockItem ? (
                  activeBlockItem.label
                ) : (
                  "¶"
                )}
                <span className={styles.toggleText}>View block elements</span>
              </button>
            ) : null}
          </div>
          <div className={styles.buttonsWrapper}>
            <BlockItems
              itemsGroups={blockItemsGroups}
              editableBlockTypes={editableBlockTypes}
              currentBlockType={currentBlockType}
              closeToolbar={this.closeToolbar}
              openToolbar={this.openToolbar}
              editorState={editorState}
              onChange={onChange}
            />
            <FormItems
              embeddableForms={embeddableFormsButtons}
              closeToolbar={this.closeToolbar}
              openToolbar={this.openToolbar}
              editorState={editorState}
              onChange={onChange}
            />
          </div>
        </Popout>
      </div>
    );
    /* eslint-enable react/jsx-no-bind */
  }
}

export default BlockToolbar;
