import React from "react";
import PropTypes from "prop-types";
import { AtomicBlockUtils, Entity } from "draft-js";
import createDataObjectRenderer from "formalist-data-object-renderer";
import * as styles from "./styles";

// Initialize the dataObjectRenderer
const dataObjectRenderer = createDataObjectRenderer();

class FormItems extends React.Component {
  static propTypes = {
    embeddableForms: PropTypes.array,
    editorState: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    closeToolbar: PropTypes.func.isRequired
  };

  static defaultProps = {
    embeddableForms: []
  };

  insertAtomicBlock = formConfig => {
    const { editorState, onChange, closeToolbar } = this.props;
    const entityKey = Entity.create("formalist", "IMMUTABLE", {
      name: formConfig.name,
      label: formConfig.label,
      form: formConfig.form,
      data: dataObjectRenderer(formConfig.form)
    });
    onChange(AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, "¶"));
    closeToolbar();
  };

  renderFormButtons = embeddableForms => {
    return embeddableForms.map(form => {
      const onClick = e => {
        e.preventDefault();
        this.insertAtomicBlock(form);
      };
      return (
        <button
          data-testid={"rich-text-form-button:" + form.name}
          className={styles.button}
          key={form.name}
          onClick={onClick}
        >
          {form.label || form.name}
        </button>
      );
    });
  };

  render() {
    const { embeddableForms } = this.props;
    if (embeddableForms.length === 0) {
      return null;
    }

    // TODO Asses whether to remove this binding
    /* eslint-disable react/jsx-no-bind */
    return (
      <div className={styles.container}>
        <ul className={styles.list} onMouseDown={e => e.preventDefault()}>
          {this.renderFormButtons(embeddableForms)}
        </ul>
      </div>
    );
    /* eslint-enable react/jsx-no-bind */
  }
}

export default FormItems;
