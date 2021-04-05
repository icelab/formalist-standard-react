var _jsxFileName = "src/components/ui/rich-text-editor/block-toolbar-plugin/form-items/index.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import PropTypes from "prop-types";
import { AtomicBlockUtils, Entity } from "draft-js";
import createDataObjectRenderer from "formalist-data-object-renderer";
import * as styles from "./styles";

// Initialize the dataObjectRenderer
var dataObjectRenderer = createDataObjectRenderer();

var FormItems = function (_React$Component) {
  _inherits(FormItems, _React$Component);

  function FormItems() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    _classCallCheck(this, FormItems);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FormItems.__proto__ || Object.getPrototypeOf(FormItems)).call.apply(_ref, [this].concat(args))), _this), _this.insertAtomicBlock = function (formConfig) {
      var _this$props = _this.props,
          editorState = _this$props.editorState,
          onChange = _this$props.onChange,
          closeToolbar = _this$props.closeToolbar;

      var entityKey = Entity.create("formalist", "IMMUTABLE", {
        name: formConfig.name,
        label: formConfig.label,
        form: formConfig.form,
        data: dataObjectRenderer(formConfig.form)
      });
      onChange(AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, "¶"));
      closeToolbar();
    }, _this.renderFormButtons = function (embeddableForms) {
      return embeddableForms.map(function (form) {
        var onClick = function onClick(e) {
          e.preventDefault();
          _this.insertAtomicBlock(form);
        };
        return React.createElement(
          "button",
          {
            "data-testid": "rich-text-form-button:" + form.name,
            className: styles.button,
            key: form.name,
            onClick: onClick,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 41
            },
            __self: _this2
          },
          form.label || form.name
        );
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FormItems, [{
    key: "render",
    value: function render() {
      var embeddableForms = this.props.embeddableForms;

      if (embeddableForms.length === 0) {
        return null;
      }

      // TODO Asses whether to remove this binding
      /* eslint-disable react/jsx-no-bind */
      return React.createElement(
        "div",
        { className: styles.container, __source: {
            fileName: _jsxFileName,
            lineNumber: 62
          },
          __self: this
        },
        React.createElement(
          "ul",
          { className: styles.list, onMouseDown: function onMouseDown(e) {
              return e.preventDefault();
            }, __source: {
              fileName: _jsxFileName,
              lineNumber: 63
            },
            __self: this
          },
          this.renderFormButtons(embeddableForms)
        )
      );
      /* eslint-enable react/jsx-no-bind */
    }
  }]);

  return FormItems;
}(React.Component);

FormItems.propTypes = {
  embeddableForms: PropTypes.array,
  editorState: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  closeToolbar: PropTypes.func.isRequired
};
FormItems.defaultProps = {
  embeddableForms: []
};


export default FormItems;