var _jsxFileName = "src/components/ui/rich-text-editor/block-toolbar-plugin/toolbar/index.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import PropTypes from "prop-types";
import { RichUtils } from "draft-js";
// Components
import Popout from "../../../popout";
import BlockItems from "../block-items";
import FormItems from "../form-items";
// Styles
import * as styles from "./styles";

/**
 * Block Toolbar
 *
 */

var BlockToolbar = function (_Component) {
  _inherits(BlockToolbar, _Component);

  function BlockToolbar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, BlockToolbar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BlockToolbar.__proto__ || Object.getPrototypeOf(BlockToolbar)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      open: false
    }, _this.calculatePosition = function () {
      var editorState = _this.props.editorState;

      var selection = editorState.getSelection();
      var selectedBlockKey = selection.getStartKey();
      var selectedBlock = document.querySelector("[data-block][data-offset-key^='" + selectedBlockKey + "']");
      if (selectedBlock && _this._positioner) {
        var blockRect = selectedBlock.getBoundingClientRect();
        var positionerParentRect = _this._positioner.offsetParent.getBoundingClientRect();
        return {
          top: Math.floor(blockRect.top - positionerParentRect.top - 8)
        };
      }
      return {};
    }, _this.onKeyDown = function (e) {
      _this.closeToolbar();
    }, _this.openToolbar = function () {
      _this.setState({
        open: true
      });
    }, _this.closeToolbar = function () {
      _this.setState({
        open: false
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(BlockToolbar, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      window.addEventListener("keydown", this.onKeyDown);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("keydown", this.onKeyDown);
    }

    /**
     * Handle position and visibility of the toolbar
     */

  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      // We have to wait a tick to calculate the position
      window.requestAnimationFrame(function () {
        _this2.setState({
          positionStyle: _this2.calculatePosition()
        });
      });
    }

    /**
     * Calculate the position of the toolbar based on the visible selection
     * and the position of the `positioner`s offsetParent.
     *
     * @return {Object} Description of the position/size of the positioner
     */

  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          blockItemsGroups = _props.blockItemsGroups,
          editableBlockTypes = _props.editableBlockTypes,
          editorState = _props.editorState,
          embeddableForms = _props.embeddableForms,
          onChange = _props.onChange;
      var _state = this.state,
          open = _state.open,
          positionStyle = _state.positionStyle;

      var currentBlockType = RichUtils.getCurrentBlockType(editorState);

      // Suck out our forms into a slightly friendly format
      var embeddableFormsButtons = [];
      if (embeddableForms) {
        embeddableFormsButtons = Object.keys(embeddableForms).sort().map(function (identifier) {
          var form = embeddableForms[identifier];
          return Object.assign({}, form, { name: identifier });
        });
      }

      // Extract the icon for the active block
      var activeBlockItem = blockItemsGroups.reduce(function (a, b) {
        return a.concat(b);
      }, []).find(function (item) {
        return item.type === currentBlockType;
      });

      var popoutOffset = {
        default: 10

        // Add horizontal offset to popout when embeddable forms are present
      };if (embeddableFormsButtons.length > 0) {
        popoutOffset.horz = 50;
      }

      // TODO Asses whether to remove this binding
      /* eslint-disable react/jsx-no-bind */
      return React.createElement(
        "div",
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 127
          },
          __self: this
        },
        React.createElement(
          Popout,
          {
            placement: "bottom",
            offset: popoutOffset,
            isOpened: open,
            closeOnOutsideClick: true,
            closeOnEsc: true,
            onClose: this.closeToolbar,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 128
            },
            __self: this
          },
          React.createElement(
            "div",
            {
              style: positionStyle,
              className: styles.positioner,
              ref: function ref(r) {
                _this3._positioner = r;
              },
              __source: {
                fileName: _jsxFileName,
                lineNumber: 136
              },
              __self: this
            },
            currentBlockType !== "atomic" ? React.createElement(
              "button",
              {
                className: styles.toggle,
                onClick: function onClick(e) {
                  e.preventDefault();
                  _this3.openToolbar();
                },
                onMouseDown: function onMouseDown(e) {
                  return e.preventDefault();
                },
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 144
                },
                __self: this
              },
              activeBlockItem && activeBlockItem.icon ? React.createElement("span", {
                title: activeBlockItem.label,
                className: styles.iconWrapper,
                dangerouslySetInnerHTML: { __html: activeBlockItem.icon },
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 153
                },
                __self: this
              }) : activeBlockItem ? activeBlockItem.label : "¶",
              React.createElement(
                "span",
                { className: styles.toggleText, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 163
                  },
                  __self: this
                },
                "View block elements"
              )
            ) : null
          ),
          React.createElement(
            "div",
            { className: styles.buttonsWrapper, __source: {
                fileName: _jsxFileName,
                lineNumber: 167
              },
              __self: this
            },
            React.createElement(BlockItems, {
              itemsGroups: blockItemsGroups,
              editableBlockTypes: editableBlockTypes,
              currentBlockType: currentBlockType,
              closeToolbar: this.closeToolbar,
              openToolbar: this.openToolbar,
              editorState: editorState,
              onChange: onChange,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 168
              },
              __self: this
            }),
            React.createElement(FormItems, {
              embeddableForms: embeddableFormsButtons,
              closeToolbar: this.closeToolbar,
              openToolbar: this.openToolbar,
              editorState: editorState,
              onChange: onChange,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 177
              },
              __self: this
            })
          )
        )
      );
      /* eslint-enable react/jsx-no-bind */
    }
  }]);

  return BlockToolbar;
}(Component);

BlockToolbar.propTypes = {
  blockItemsGroups: PropTypes.array,
  editableBlockTypes: PropTypes.array,
  embeddableForms: PropTypes.object,
  editorHasFocus: PropTypes.bool.isRequired,
  editorState: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};


export default BlockToolbar;