var _jsxFileName = "src/components/many/index.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import classNames from "classnames";

// Components
import FieldErrors from "../fields/common/errors";
import Sortable from "../ui/sortable";

// Styles
import * as styles from "./styles";

var ManySet = function (_React$Component) {
  _inherits(ManySet, _React$Component);

  function ManySet() {
    _classCallCheck(this, ManySet);

    return _possibleConstructorReturn(this, (ManySet.__proto__ || Object.getPrototypeOf(ManySet)).apply(this, arguments));
  }

  _createClass(ManySet, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: styles.set, __source: {
            fileName: _jsxFileName,
            lineNumber: 19
          },
          __self: this
        },
        this.props.children
      );
    }
  }]);

  return ManySet;
}(React.Component);

ManySet.propTypes = {
  children: ImmutablePropTypes.list
};

var Many = function (_React$Component2) {
  _inherits(Many, _React$Component2);

  function Many() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, Many);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Many.__proto__ || Object.getPrototypeOf(Many)).call.apply(_ref, [this].concat(args))), _this2), _this2.state = {
      contentsKey: Date.now()
    }, _this2.updateContentsKey = function () {
      _this2.setState({
        contentsKey: Date.now()
      });
    }, _this2.addChild = function (e) {
      e.preventDefault();
      var addChild = _this2.props.addChild;

      addChild();
      _this2.updateContentsKey();
    }, _this2.onRemove = function (index) {
      var removeChild = _this2.props.removeChild;

      removeChild(index);
      _this2.updateContentsKey();
    }, _this2.onDrop = function (newOrder) {
      var reorderChildren = _this2.props.reorderChildren;

      reorderChildren(newOrder);
      _this2.updateContentsKey();
    }, _this2.onMove = function (newOrder) {
      var reorderChildren = _this2.props.reorderChildren;

      reorderChildren(newOrder);
      _this2.updateContentsKey();
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  /**
   * Set an initial `contentsKey` so we can reliably render changes to the
   * contents/children as they are sorted
   * @return {Object}
   */


  _createClass(Many, [{
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
      return this.props.hashCode !== nextProps.hashCode || this.state.contentsKey !== nextState.contentsKey;
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

  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          attributes = _props.attributes,
          children = _props.children,
          errors = _props.errors,
          name = _props.name;

      var hasErrors = errors.count() > 0;
      var contentsKey = this.state.contentsKey;

      // Extract attributes from Immutable.Map

      var _attributes$toJS = attributes.toJS(),
          label = _attributes$toJS.label,
          action_label = _attributes$toJS.action_label,
          placeholder = _attributes$toJS.placeholder,
          moveable = _attributes$toJS.moveable;

      label = label || name.replace(/_/, " ");

      // Set up label classes
      var labelClassNames = classNames(styles.label, _defineProperty({}, "" + styles.labelErrors, hasErrors));

      return React.createElement(
        "div",
        { className: styles.base, "data-many": name, __source: {
            fileName: _jsxFileName,
            lineNumber: 143
          },
          __self: this
        },
        React.createElement(
          "div",
          { className: styles.header, __source: {
              fileName: _jsxFileName,
              lineNumber: 144
            },
            __self: this
          },
          React.createElement(
            "h3",
            { className: labelClassNames, __source: {
                fileName: _jsxFileName,
                lineNumber: 145
              },
              __self: this
            },
            label
          ),
          React.createElement(
            "div",
            { className: styles.controls, __source: {
                fileName: _jsxFileName,
                lineNumber: 146
              },
              __self: this
            },
            React.createElement(
              "button",
              { className: styles.addButton, onClick: this.addChild, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 147
                },
                __self: this
              },
              action_label || "Add item"
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
            verticalControls: true,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 153
            },
            __self: this
          },
          children.map(function (setChildren, i) {
            return React.createElement(
              ManySet,
              { key: contentsKey + "_" + i, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 164
                },
                __self: _this3
              },
              setChildren
            );
          })
        ) : React.createElement(
          "div",
          { className: styles.placeholder, __source: {
              fileName: _jsxFileName,
              lineNumber: 168
            },
            __self: this
          },
          React.createElement(
            "span",
            { className: styles.placeholderText, __source: {
                fileName: _jsxFileName,
                lineNumber: 169
              },
              __self: this
            },
            placeholder || "No items have been added.",
            " "
          ),
          React.createElement(
            "button",
            {
              className: styles.placeholderButton,
              onClick: this.addChild,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 172
              },
              __self: this
            },
            "Add the first?"
          )
        ),
        hasErrors ? React.createElement(FieldErrors, { errors: errors, __source: {
            fileName: _jsxFileName,
            lineNumber: 180
          },
          __self: this
        }) : null
      );
    }
  }]);

  return Many;
}(React.Component);

Many.propTypes = {
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
    max_height: PropTypes.string
  }),
  template: PropTypes.object,
  children: ImmutablePropTypes.list,
  addChild: PropTypes.func.isRequired,
  removeChild: PropTypes.func.isRequired,
  reorderChildren: PropTypes.func.isRequired,
  editChildren: PropTypes.func.isRequired
};


export default Many;
export var ManyFactory = React.createFactory(Many);