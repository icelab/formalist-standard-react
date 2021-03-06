var _jsxFileName = "src/components/fields/container/index.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import classNames from "classnames";
import * as styles from "./styles";

/**
 * Container class for fields.
 *
 * Consolidates common attributes and actions into a single place.
 *
 */

var FieldContainer = function (_React$Component) {
  _inherits(FieldContainer, _React$Component);

  function FieldContainer() {
    _classCallCheck(this, FieldContainer);

    return _possibleConstructorReturn(this, (FieldContainer.__proto__ || Object.getPrototypeOf(FieldContainer)).apply(this, arguments));
  }

  _createClass(FieldContainer, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        globalConfig: this.props.globalConfig
      };
    }

    /**
     * Create `context` object for each field to access
     */

  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      // Use the path hash-code to determine whether or not to rerender this
      // field. This should take account of any change to the AST.
      // It will not account for changes to the overall form definition (but they
      // should not change after runtime anyway)
      return this.props.hashCode !== nextProps.hashCode;
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          attributes = _props.attributes,
          bus = _props.bus,
          config = _props.config,
          edit = _props.edit,
          errors = _props.errors,
          field = _props.field,
          name = _props.name,
          namePath = _props.namePath,
          remove = _props.remove,
          rules = _props.rules,
          value = _props.value;

      var Field = field;

      // Turn the attributes from an Immutable.Map into a POJO
      attributes = attributes.toJS();

      // Extract a few things from attributes
      var label = attributes.label || this.props.name.replace(/_/g, " ");
      var _attributes = attributes,
          hint = _attributes.hint;

      // Set up standard classNames

      var containerClassNames = classNames(styles.base, _defineProperty({}, "" + styles.errors, errors.count() > 0));

      return (
        // *Explicitly* pass all the props we care about down to the field
        // rather than dumping everything through
        React.createElement(
          "div",
          { className: containerClassNames, "data-field-container": namePath, __source: {
              fileName: _jsxFileName,
              lineNumber: 83
            },
            __self: this
          },
          React.createElement(Field, {
            actions: { edit: edit, remove: remove },
            bus: bus,
            config: config,
            name: name,
            namePath: namePath,
            value: value,
            rules: rules,
            errors: errors,
            attributes: attributes,
            label: label,
            hint: hint,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 84
            },
            __self: this
          })
        )
      );
    }
  }]);

  return FieldContainer;
}(React.Component);

FieldContainer.propTypes = {
  attributes: ImmutablePropTypes.map,
  bus: PropTypes.object.isRequired,
  config: PropTypes.object,
  errors: ImmutablePropTypes.list,
  field: PropTypes.func.isRequired,
  globalConfig: PropTypes.object,
  hashCode: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  path: ImmutablePropTypes.list.isRequired,
  namePath: PropTypes.string.isRequired,
  rules: ImmutablePropTypes.list,
  type: PropTypes.string.isRequired,
  value: PropTypes.any
};
FieldContainer.childContextTypes = {
  globalConfig: PropTypes.object
};


export default FieldContainer;