import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import classNames from "classnames";
import fuzzy from "fuzzy";

// Components
import FieldErrors from "../fields/common/errors";
import Sortable from "../ui/sortable";
import Popout from "../ui/popout";

// Styles
import * as styles from "./styles";

/**
 * Default component for representing a "selected/selection" item
 * @param  {Object} props Taking the shape of:
 *
 * {
 *   option: { label: 'foo'}
 *  }
 *
 * I.e., expecting the option to have a `label` key with a string value.
 *
 * @return {ReactElement}
 */
const SelectDefault = ({ option }) => (
  <div className="fba-center" style={{ width: "100%" }}>
    <div style={{ width: "calc(100% - 65px)" }}>
      <p className="mb-xsmall">{option.label}</p>
    </div>
    <div style={{ width: "220px", marginLeft: "15px" }}>
      {option.preview_image_url ? (
        <img
          alt=""
          style={{ maxWidth: "100%" }}
          src={option.preview_image_url}
        />
      ) : (
        ""
      )}
    </div>
  </div>
);

SelectDefault.propTypes = {
  option: PropTypes.shape({
    label: PropTypes.string,
    preview_image_url: PropTypes.string,
  }),
};

class ManyFormsSet extends React.Component {
  static propTypes = {
    children: PropTypes.object,
  };

  render() {
    return <div className={styles.set}>{this.props.children}</div>;
  }
}

class ManyForms extends React.Component {
  static propTypes = {
    hashCode: PropTypes.number.isRequired,
    name: PropTypes.string,
    namePath: PropTypes.string,
    path: ImmutablePropTypes.list.isRequired,
    contentsPath: ImmutablePropTypes.list.isRequired,
    type: PropTypes.string,
    rules: ImmutablePropTypes.list,
    errors: ImmutablePropTypes.list,
    attributes: ImmutablePropTypes.mapContains({
      label: PropTypes.string,
      placeholder: PropTypes.string,
      action_label: PropTypes.string,
      sortable: PropTypes.bool,
      moveable: PropTypes.bool,
      max_height: PropTypes.string,
      embeddable_forms: PropTypes.object,
    }),
    children: ImmutablePropTypes.list,
    addChild: PropTypes.func.isRequired,
    removeChild: PropTypes.func.isRequired,
    reorderChildren: PropTypes.func.isRequired,
    editChildren: PropTypes.func.isRequired,
  };

  /**
   * Set an initial `contentsKey` so we can reliably render changes to the
   * contents/children as they are sorted
   * @return {Object}
   */
  state = {
    contentsKey: Date.now(),
    search: null,
    searchFocus: false,
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
      this.state.contentsKey !== nextState.contentsKey ||
      this.state.search !== nextState.search ||
      this.state.searchFocus !== nextState.searchFocus
    );
  }

  updateContentsKey = () => {
    this.setState({
      contentsKey: Date.now(),
    });
  };

  /**
   * Inject a new content/child from the template
   * @param {Event} e Mouse/KeyboardEvent
   */
  addChild = (e) => {
    e.preventDefault();
    const { addChild } = this.props;
    addChild();
    this.updateContentsKey();
  };

  /**
   * When selected item is removed
   * @param {Number} index Index of the item to remove
   * @return {Null}
   */
  onRemove = (index) => {
    const { removeChild } = this.props;
    removeChild(index);
    this.updateContentsKey();
  };

  /**
   * When selected item is removed
   * @return {Null}
   */
  onDrop = (newOrder) => {
    const { reorderChildren } = this.props;
    reorderChildren(newOrder);
    this.updateContentsKey();
  };

  /**
   * When items are moved
   * @param {Array} the new order for the children
   * @return {Null}
   */
  onMove = (newOrder) => {
    const { reorderChildren } = this.props;
    reorderChildren(newOrder);
    this.updateContentsKey();
  };

  /**
   * When a selection is made, trigger change and close the selector
   * @return {Null}
   */
  onFormSelection = (formName) => {
    const { attributes, addChild } = this.props;
    const form = attributes.get("embeddable_forms").get(formName);
    addChild(formName, form);
    this.closeSelector();
    this.updateContentsKey();
  };

  /**
   * Open the selector popout
   * @return {Null}
   */
  openSelector = () => {
    this._selector.openPopout();
  };

  /**
   * Close the selector popout
   * @return {Null}
   */
  closeSelector = () => {
    this._selector.closePopout();
  };

  /**
   * On choose click, open selector
   * @return {Null}
   */
  onChooseClick = (e) => {
    e.preventDefault();
    this.toggleSelector();
  };

  /**
   * Toggle the selector popout
   * @return {Null}
   */
  toggleSelector = () => {
    this._selector.togglePopout();
  };

  /**
   * On popout open, focus the search input
   * @return {Null}
   */
  onPopoutOpen = () => {
    this._search.focus();
  };

  /**
   * On search input focus
   * @param  {Event} e Keyboard event
   * @return {Null}
   */
  onSearchFocus = (e) => {
    this.setState({
      searchFocus: true,
    });
  };

  /**
   * On search input blur
   * @param  {Event} e Keyboard event
   * @return {Null}
   */
  onSearchBlur = (e) => {
    this.setState({
      searchFocus: false,
    });
  };

  /**
   * Fired when search input is `change`d.
   * Set this.state.search to the value of the input
   * @param  {Event} e Keyboard event
   * @return {Null}
   */
  onSearchChange = (e) => {
    const search = e.target.value;
    this.setState({
      search: search,
    });
  };

  /**
   * On popout close, reset the search
   * @return {Null}
   */
  onPopoutClose = () => {
    this.setState({
      search: null,
    });
  };

  /**
   * On popout open, focus the search input
   * @return {Null}
   */
  onPopoutOpen = () => {
    this._search.focus();
  };

  render() {
    const { attributes, children, errors, name } = this.props;
    const { search, searchFocus } = this.state;
    let hasErrors = errors.count() > 0;
    const { contentsKey } = this.state;

    // Extract attributes from Immutable.Map
    let {
      label,
      action_label,
      placeholder,
      moveable,
      embeddable_forms,
    } = attributes.toJS();
    label = label || name.replace(/_/, " ");

    // Set up label classes
    let labelClassNames = classNames(styles.label, {
      [`${styles.labelErrors}`]: hasErrors,
    });

    let Option = SelectDefault;

    const options = Object.keys(embeddable_forms).sort().map((key) => {
      return {
        id: key,
        label: embeddable_forms[key].label,
        preview_image_url: embeddable_forms[key].preview_image_url,
      };
    });

    // Filter options
    let filteredOptions = options;
    if (search) {
      filteredOptions = options.filter((option) => {
        const values = [String(option["label"])];
        const results = fuzzy.filter(search, values);
        return results && results.length > 0;
      });
    }

    // Build the set of options
    const renderedOptions = filteredOptions.map((option) => {
      // TODO Asses whether to remove this binding
      /* eslint-disable react/jsx-no-bind */
      let onClick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.onFormSelection(option.id);
      }.bind(this);
      /* eslint-enable react/jsx-no-bind */
      return (
        <button
          key={option.id}
          data-testid={"many-forms-form-button:" + option.id}
          className={styles.optionButton}
          onClick={onClick}
        >
          <Option option={option} />
        </button>
      );
    });

    return (
      <div className={styles.base} data-many-child-forms={name}>
        <div className={styles.header}>
          <h3 className={labelClassNames}>{label}</h3>
          <div className={styles.controls}>
            <button data-open-selector-button onClick={this.onChooseClick}>
              <Popout
                ref={(r) => {
                  this._selector = r;
                }}
                placement="left"
                onClose={this.onPopoutClose}
                onOpen={this.onPopoutOpen}
                closeOnEsc={!searchFocus || !search}
                closeOnOutsideClick
                testId={`many-child-forms-field:${name}`}
              >
                <div className={styles.openSelectorButton}>
                  {action_label || "Add item"}
                </div>
                <div className={styles.options}>
                  <input
                    ref={(r) => {
                      this._search = r;
                    }}
                    type="search"
                    className={styles.search}
                    placeholder="Type to filter"
                    onBlur={this.onSearchBlur}
                    onFocus={this.onSearchFocus}
                    onChange={this.onSearchChange}
                  />
                  <div className={styles.optionsList}>
                    {renderedOptions.length > 0 ? (
                      renderedOptions
                    ) : (
                      <p className={styles.noResults}>No matching results</p>
                    )}
                  </div>
                </div>
              </Popout>
            </button>
          </div>
        </div>
        {children.count() > 0 ? (
          <Sortable
            canRemove
            onRemove={this.onRemove}
            onDrop={this.onDrop}
            canMove={moveable}
            onMove={this.onMove}
            canSort={attributes.sortable}
            maxHeight={attributes.max_height}
            itemDisplayMode="large"
            verticalControls
          >
            {children.map((childForm, i) => (
              <ManyFormsSet key={`${contentsKey}_${i}`}>
                {childForm}
              </ManyFormsSet>
            ))}
          </Sortable>
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.placeholderText}>
              {placeholder || "No items have been added."}{" "}
            </span>
          </div>
        )}
        {hasErrors ? <FieldErrors errors={errors} /> : null}
      </div>
    );
  }
}

export default ManyForms;
export let ManyFormsFactory = React.createFactory(ManyForms);
