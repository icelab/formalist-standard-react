import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import * as styles from "./styles";

class ChildForm extends React.Component {
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
    let previewImageUrl = attributes.get("preview_image_url");

    return (
      <div data-child-form>
        <div className={styles.wrapper}>
          {label ? <h2 className={styles.label}>{label}</h2> : null}
          {previewImageUrl ? (<img className={styles.previewImage} src={previewImageUrl} alt={label} />) : null}
        </div>
        <div className={styles.children}>{children}</div>
      </div>
    );
  }
}

export default ChildForm;
export let ChildFormFactory = React.createFactory(ChildForm);
