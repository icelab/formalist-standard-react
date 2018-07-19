import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import classNames from "classnames";
import { actions } from "formalist-compose";
import validation from "formalist-validation";

// Components
import FieldErrors from "../fields/common/errors";
import Sortable from "../ui/sortable";

// Styles
import * as styles from "./styles";

const {
  addManyContent,
  deleteManyContent,
  reorderManyContents,
  validateMany
} = actions;

class ManySet extends React.Component {
  static propTypes = {
    children: ImmutablePropTypes.list
  };

  render() {
    return <div className={styles.set}>{this.props.children}</div>;
  }
}

class Many extends React.Component {
  static propTypes = {
    hashCode: PropTypes.number.isRequired,
    name: PropTypes.string,
    path: ImmutablePropTypes.list.isRequired,
    contentsPath: ImmutablePropTypes.list.isRequired,
    store: PropTypes.object.isRequired,
    type: PropTypes.string,
    rules: ImmutablePropTypes.list,
    errors: ImmutablePropTypes.list,
    attributes: ImmutablePropTypes.mapContains({
      label: PropTypes.string,
      placeholder: PropTypes.string,
      action_label: PropTypes.string,
      max_height: PropTypes.string
    }),
    template: PropTypes.object,
    children: ImmutablePropTypes.list
  };

  /**
   * Set an initial `contentsKey` so we can reliably render changes to the
   * contents/children as they are sorted
   * @return {Object}
   */
  state = {
    contentsKey: Date.now()
  };

  componentWillReceiveProps(nextProps) {
    // Naive check to see if the children have changed
    // so we can refresh the `contentsKey`
    if (this.props.children.count() !== nextProps.children.count()) {
      this.updateContentsKey();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Use the path hash-code to determine whether or not to rerender this
    // section. This should take account of any change to the AST.
    // It will not account for changes to the overall form definition (but they
    // should not change after runtime anyway)
    //
    // We also check the `contentsKey` we set in state
    return (
      this.props.hashCode !== nextProps.hashCode ||
      this.state.contentsKey !== nextState.contentsKey
    );
  }

  updateContentsKey = () => {
    this.setState({
      contentsKey: Date.now()
    });
  };

  /**
   * Tell the store to inject a new content/child from the template
   * @param {Event} e Mouse/KeyboardEvent
   */
  addChild = e => {
    e.preventDefault();
    let { attributes, store, path } = this.props;
    const validationRules = attributes.get("validation")
      ? attributes.get("validation").toJS()
      : null;

    store.batchDispatch([
      addManyContent(path),
      validateMany(path, validation(validationRules))
    ]);
    this.updateContentsKey();
  };

  /**
   * When selected item is removed
   * @param {Number} index Index of the item to remove
   * @return {Null}
   */
  onRemove = index => {
    let { attributes, store, contentsPath, path } = this.props;
    let childPath = contentsPath.push(index);
    const validationRules = attributes.get("validation")
      ? attributes.get("validation").toJS()
      : null;

    store.batchDispatch([
      deleteManyContent(childPath),
      validateMany(path, validation(validationRules))
    ]);
    this.updateContentsKey();
  };

  /**
   * When selected item is removed
   * @return {Null}
   */
  onDrop = newOrder => {
    const { attributes, store, path } = this.props;
    const validationRules = attributes.get("validation")
      ? attributes.get("validation").toJS()
      : null;

    store.batchDispatch([
      reorderManyContents(path, newOrder),
      validateMany(path, validation(validationRules))
    ]);
    this.updateContentsKey();
  };

  render() {
    const { attributes, children, errors, name } = this.props;
    let hasErrors = errors.count() > 0;
    const { contentsKey } = this.state;

    // Extract attributes from Immutable.Map
    let { label, action_label, placeholder } = attributes.toJS();
    label = label || name.replace(/_/, " ");

    // Set up label classes
    let labelClassNames = classNames(styles.label, {
      [`${styles.labelErrors}`]: hasErrors
    });

    return (
      <div className={styles.base} data-many={name}>
        <div className={styles.header}>
          <h3 className={labelClassNames}>{label}</h3>
          <div className={styles.controls}>
            <button className={styles.addButton} onClick={this.addChild}>
              {action_label || "Add item"}
            </button>
          </div>
        </div>
        {children.count() > 0 ? (
          <Sortable
            canRemove
            onRemove={this.onRemove}
            onDrop={this.onDrop}
            maxHeight={attributes.max_height}
            verticalControls
          >
            {children.map((setChildren, i) => (
              <ManySet key={`${contentsKey}_${i}`}>{setChildren}</ManySet>
            ))}
          </Sortable>
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.placeholderText}>
              {placeholder || "No items have been added."}{" "}
            </span>
            <button
              className={styles.placeholderButton}
              onClick={this.addChild}
            >
              Add the first?
            </button>
          </div>
        )}
        {hasErrors ? <FieldErrors errors={errors} /> : null}
      </div>
    );
  }
}

export default Many;
export let ManyFactory = React.createFactory(Many);
