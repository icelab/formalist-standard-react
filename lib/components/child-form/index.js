var _jsxFileName = "src/components/child-form/index.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import * as styles from "./styles";

var ChildForm = function (_React$Component) {
  _inherits(ChildForm, _React$Component);

  function ChildForm() {
    _classCallCheck(this, ChildForm);

    return _possibleConstructorReturn(this, (ChildForm.__proto__ || Object.getPrototypeOf(ChildForm)).apply(this, arguments));
  }

  _createClass(ChildForm, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      // Use the path hash-code to determine whether or not to rerender this
      // section. This should take account of any change to the AST.
      // It will not account for changes to the overall form definition (but they
      // should not change after runtime anyway)
      return this.props.hashCode !== nextProps.hashCode;
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          attributes = _props.attributes,
          children = _props.children;


      var label = attributes.get("label");
      var previewImageUrl = attributes.get("preview_image_url");

      return React.createElement(
        "div",
        { "data-child-form": true, __source: {
            fileName: _jsxFileName,
            lineNumber: 28
          },
          __self: this
        },
        React.createElement(
          "div",
          { className: styles.wrapper, __source: {
              fileName: _jsxFileName,
              lineNumber: 29
            },
            __self: this
          },
          label ? React.createElement(
            "h2",
            { className: styles.label, __source: {
                fileName: _jsxFileName,
                lineNumber: 30
              },
              __self: this
            },
            label
          ) : null,
          previewImageUrl ? React.createElement("img", { className: styles.previewImage, src: previewImageUrl, alt: label, __source: {
              fileName: _jsxFileName,
              lineNumber: 31
            },
            __self: this
          }) : null
        ),
        React.createElement(
          "div",
          { className: styles.children, __source: {
              fileName: _jsxFileName,
              lineNumber: 33
            },
            __self: this
          },
          children
        )
      );
    }
  }]);

  return ChildForm;
}(React.Component);

ChildForm.propTypes = {
  hashCode: PropTypes.number.isRequired,
  type: PropTypes.string,
  children: ImmutablePropTypes.list
};


export default ChildForm;
export var ChildFormFactory = React.createFactory(ChildForm);