var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsxFileName = "src/components/many-forms/index.js",
    _this = this;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
var SelectDefault = function SelectDefault(_ref) {
  var option = _ref.option;
  return React.createElement(
    "div",
    { className: "fba-center", style: { width: "100%" }, __source: {
        fileName: _jsxFileName,
        lineNumber: 28
      },
      __self: _this
    },
    React.createElement(
      "div",
      { style: { width: "calc(100% - 65px)" }, __source: {
          fileName: _jsxFileName,
          lineNumber: 29
        },
        __self: _this
      },
      React.createElement(
        "p",
        { className: "mb-xsmall", __source: {
            fileName: _jsxFileName,
            lineNumber: 30
          },
          __self: _this
        },
        option.label
      )
    ),
    React.createElement(
      "div",
      { style: { width: "220px", marginLeft: "15px" }, __source: {
          fileName: _jsxFileName,
          lineNumber: 32
        },
        __self: _this
      },
      option.preview_image_url ? React.createElement("img", {
        alt: "",
        style: { maxWidth: "100%" },
        src: option.preview_image_url,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 34
        },
        __self: _this
      }) : ""
    )
  );
};

SelectDefault.propTypes = {
  option: PropTypes.shape({
    label: PropTypes.string,
    preview_image_url: PropTypes.string
  })
};

var ManyFormsSet = function (_React$Component) {
  _inherits(ManyFormsSet, _React$Component);

  function ManyFormsSet() {
    _classCallCheck(this, ManyFormsSet);

    return _possibleConstructorReturn(this, (ManyFormsSet.__proto__ || Object.getPrototypeOf(ManyFormsSet)).apply(this, arguments));
  }

  _createClass(ManyFormsSet, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: styles.set, __source: {
            fileName: _jsxFileName,
            lineNumber: 59
          },
          __self: this
        },
        this.props.children
      );
    }
  }]);

  return ManyFormsSet;
}(React.Component);

ManyFormsSet.propTypes = {
  children: PropTypes.object
};

var ManyForms = function (_React$Component2) {
  _inherits(ManyForms, _React$Component2);

  function ManyForms() {
    var _ref2;

    var _temp, _this3, _ret;

    _classCallCheck(this, ManyForms);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this3 = _possibleConstructorReturn(this, (_ref2 = ManyForms.__proto__ || Object.getPrototypeOf(ManyForms)).call.apply(_ref2, [this].concat(args))), _this3), _this3.state = {
      contentsKey: Date.now(),
      search: null,
      searchFocus: false
    }, _this3.updateContentsKey = function () {
      _this3.setState({
        contentsKey: Date.now()
      });
    }, _this3.addChild = function (e) {
      e.preventDefault();
      var addChild = _this3.props.addChild;

      addChild();
      _this3.updateContentsKey();
    }, _this3.onRemove = function (index) {
      var removeChild = _this3.props.removeChild;

      removeChild(index);
      _this3.updateContentsKey();
    }, _this3.onDrop = function (newOrder) {
      var reorderChildren = _this3.props.reorderChildren;

      reorderChildren(newOrder);
      _this3.updateContentsKey();
    }, _this3.onMove = function (newOrder) {
      var reorderChildren = _this3.props.reorderChildren;

      reorderChildren(newOrder);
      _this3.updateContentsKey();
    }, _this3.onFormSelection = function (formName) {
      var _this3$props = _this3.props,
          attributes = _this3$props.attributes,
          addChild = _this3$props.addChild;

      var form = attributes.get("embeddable_forms").get(formName);
      addChild(formName, form);
      _this3.closeSelector();
      _this3.updateContentsKey();
    }, _this3.openSelector = function () {
      _this3._selector.openPopout();
    }, _this3.closeSelector = function () {
      _this3._selector.closePopout();
    }, _this3.onChooseClick = function (e) {
      e.preventDefault();
      _this3.toggleSelector();
    }, _this3.toggleSelector = function () {
      _this3._selector.togglePopout();
    }, _this3.onPopoutOpen = function () {
      _this3._search.focus();
    }, _this3.onSearchFocus = function (e) {
      _this3.setState({
        searchFocus: true
      });
    }, _this3.onSearchBlur = function (e) {
      _this3.setState({
        searchFocus: false
      });
    }, _this3.onSearchChange = function (e) {
      var search = e.target.value;
      _this3.setState({
        search: search
      });
    }, _this3.onPopoutClose = function () {
      _this3.setState({
        search: null
      });
    }, _this3.onPopoutOpen = function () {
      _this3._search.focus();
    }, _temp), _possibleConstructorReturn(_this3, _ret);
  }

  /**
   * Set an initial `contentsKey` so we can reliably render changes to the
   * contents/children as they are sorted
   * @return {Object}
   */


  _createClass(ManyForms, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      // Naive check to see if the children have changed
      // so we can refresh the `contentsKey`
      if (this.props.children.count() !== nextProps.children.count()) {
        this.updateContentsKey();
      }
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      // Use the path hash-code to determine whether or not to rerender this
      // section. This should take account of any change to the AST.
      // It will not account for changes to the overall form definition (but they
      // should not change after runtime anyway)
      //
      // We also check the `contentsKey` we set in state
      return this.props.hashCode !== nextProps.hashCode || this.state.contentsKey !== nextState.contentsKey || this.state.search !== nextState.search || this.state.searchFocus !== nextState.searchFocus;
    }

    /**
     * Inject a new content/child from the template
     * @param {Event} e Mouse/KeyboardEvent
     */


    /**
     * When selected item is removed
     * @param {Number} index Index of the item to remove
     * @return {Null}
     */


    /**
     * When selected item is removed
     * @return {Null}
     */


    /**
     * When items are moved
     * @param {Array} the new order for the children
     * @return {Null}
     */


    /**
     * When a selection is made, trigger change and close the selector
     * @return {Null}
     */


    /**
     * Open the selector popout
     * @return {Null}
     */


    /**
     * Close the selector popout
     * @return {Null}
     */


    /**
     * On choose click, open selector
     * @return {Null}
     */


    /**
     * Toggle the selector popout
     * @return {Null}
     */


    /**
     * On popout open, focus the search input
     * @return {Null}
     */


    /**
     * On search input focus
     * @param  {Event} e Keyboard event
     * @return {Null}
     */


    /**
     * On search input blur
     * @param  {Event} e Keyboard event
     * @return {Null}
     */


    /**
     * Fired when search input is `change`d.
     * Set this.state.search to the value of the input
     * @param  {Event} e Keyboard event
     * @return {Null}
     */


    /**
     * On popout close, reset the search
     * @return {Null}
     */


    /**
     * On popout open, focus the search input
     * @return {Null}
     */

  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _props = this.props,
          attributes = _props.attributes,
          children = _props.children,
          errors = _props.errors,
          name = _props.name;
      var _state = this.state,
          search = _state.search,
          searchFocus = _state.searchFocus;

      var hasErrors = errors.count() > 0;
      var contentsKey = this.state.contentsKey;

      // Extract attributes from Immutable.Map

      var _attributes$toJS = attributes.toJS(),
          label = _attributes$toJS.label,
          action_label = _attributes$toJS.action_label,
          placeholder = _attributes$toJS.placeholder,
          moveable = _attributes$toJS.moveable,
          embeddable_forms = _attributes$toJS.embeddable_forms;

      label = label || name.replace(/_/, " ");

      // Set up label classes
      var labelClassNames = classNames(styles.label, _defineProperty({}, "" + styles.labelErrors, hasErrors));

      var Option = SelectDefault;

      var options = Object.keys(embeddable_forms).sort().map(function (key) {
        return {
          id: key,
          label: embeddable_forms[key].label,
          preview_image_url: embeddable_forms[key].preview_image_url
        };
      });

      // Filter options
      var filteredOptions = options;
      if (search) {
        filteredOptions = options.filter(function (option) {
          var values = [String(option["label"])];
          var results = fuzzy.filter(search, values);
          return results && results.length > 0;
        });
      }

      // Build the set of options
      var renderedOptions = filteredOptions.map(function (option) {
        // TODO Asses whether to remove this binding
        /* eslint-disable react/jsx-no-bind */
        var onClick = function (e) {
          e.preventDefault();
          e.stopPropagation();
          this.onFormSelection(option.id);
        }.bind(_this4);
        /* eslint-enable react/jsx-no-bind */
        return React.createElement(
          "button",
          {
            key: option.id,
            "data-testid": "many-forms-form-button:" + option.id,
            className: styles.optionButton,
            onClick: onClick,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 330
            },
            __self: _this4
          },
          React.createElement(Option, { option: option, __source: {
              fileName: _jsxFileName,
              lineNumber: 336
            },
            __self: _this4
          })
        );
      });

      return React.createElement(
        "div",
        { className: styles.base, "data-many-child-forms": name, __source: {
            fileName: _jsxFileName,
            lineNumber: 342
          },
          __self: this
        },
        React.createElement(
          "div",
          { className: styles.header, __source: {
              fileName: _jsxFileName,
              lineNumber: 343
            },
            __self: this
          },
          React.createElement(
            "h3",
            { className: labelClassNames, __source: {
                fileName: _jsxFileName,
                lineNumber: 344
              },
              __self: this
            },
            label
          ),
          React.createElement(
            "div",
            { className: styles.controls, __source: {
                fileName: _jsxFileName,
                lineNumber: 345
              },
              __self: this
            },
            React.createElement(
              "button",
              { "data-open-selector-button": true, onClick: this.onChooseClick, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 346
                },
                __self: this
              },
              React.createElement(
                Popout,
                {
                  ref: function ref(r) {
                    _this4._selector = r;
                  },
                  placement: "left",
                  onClose: this.onPopoutClose,
                  onOpen: this.onPopoutOpen,
                  closeOnEsc: !searchFocus || !search,
                  closeOnOutsideClick: true,
                  testId: "many-child-forms-field:" + name,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 347
                  },
                  __self: this
                },
                React.createElement(
                  "div",
                  { className: styles.openSelectorButton, __source: {
                      fileName: _jsxFileName,
                      lineNumber: 358
                    },
                    __self: this
                  },
                  action_label || "Add item"
                ),
                React.createElement(
                  "div",
                  { className: styles.options, __source: {
                      fileName: _jsxFileName,
                      lineNumber: 361
                    },
                    __self: this
                  },
                  React.createElement("input", {
                    ref: function ref(r) {
                      _this4._search = r;
                    },
                    type: "search",
                    className: styles.search,
                    placeholder: "Type to filter",
                    onBlur: this.onSearchBlur,
                    onFocus: this.onSearchFocus,
                    onChange: this.onSearchChange,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 362
                    },
                    __self: this
                  }),
                  React.createElement(
                    "div",
                    { className: styles.optionsList, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 373
                      },
                      __self: this
                    },
                    renderedOptions.length > 0 ? renderedOptions : React.createElement(
                      "p",
                      { className: styles.noResults, __source: {
                          fileName: _jsxFileName,
                          lineNumber: 377
                        },
                        __self: this
                      },
                      "No matching results"
                    )
                  )
                )
              )
            )
          )
        ),
        children.count() > 0 ? React.createElement(
          Sortable,
          {
            canRemove: true,
            onRemove: this.onRemove,
            onDrop: this.onDrop,
            canMove: moveable,
            onMove: this.onMove,
            canSort: attributes.sortable,
            maxHeight: attributes.max_height,
            itemDisplayMode: "large",
            verticalControls: true,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 386
            },
            __self: this
          },
          children.map(function (childForm, i) {
            return React.createElement(
              ManyFormsSet,
              { key: contentsKey + "_" + i, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 398
                },
                __self: _this4
              },
              childForm
            );
          })
        ) : React.createElement(
          "div",
          { className: styles.placeholder, __source: {
              fileName: _jsxFileName,
              lineNumber: 404
            },
            __self: this
          },
          React.createElement(
            "span",
            { className: styles.placeholderText, __source: {
                fileName: _jsxFileName,
                lineNumber: 405
              },
              __self: this
            },
            placeholder || "No items have been added.",
            " "
          )
        ),
        hasErrors ? React.createElement(FieldErrors, { errors: errors, __source: {
            fileName: _jsxFileName,
            lineNumber: 410
          },
          __self: this
        }) : null
      );
    }
  }]);

  return ManyForms;
}(React.Component);

ManyForms.propTypes = {
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
    embeddable_forms: PropTypes.object
  }),
  children: ImmutablePropTypes.list,
  addChild: PropTypes.func.isRequired,
  removeChild: PropTypes.func.isRequired,
  reorderChildren: PropTypes.func.isRequired,
  editChildren: PropTypes.func.isRequired
};


export default ManyForms;
export var ManyFormsFactory = React.createFactory(ManyForms);