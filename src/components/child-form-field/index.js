import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import * as styles from "./styles";

class FormField extends React.Component {
  static propTypes = {
    hashCode: PropTypes.number.isRequired,
    type: PropTypes.string,
    children: ImmutablePropTypes.list
  };

  shouldComponentUpdate(nextProps) {
    // Use the path hash-code to determine whether or not to rerender this
    // section. This should take account of any change to the AST.
    // It will not account for changes to the overall form definition (but they
    // should not change after runtime anyway)
    return this.props.hashCode !== nextProps.hashCode;
  }

  render() {
    let { attributes, children } = this.props;

    let label = attributes.get("label");

    return (
      <div className={styles.base} data-form-field>
        {label ? <h2 className={styles.label}>{label}</h2> : null}
        <div className={styles.children}>{children}</div>
      </div>
    );
  }
}

export default FormField;
export let FormFieldFactory = React.createFactory(FormField);
