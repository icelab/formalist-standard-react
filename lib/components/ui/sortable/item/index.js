var _jsxFileName = "src/components/ui/sortable/item/index.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import PropTypes from "prop-types";
import { findDOMNode } from "react-dom";
import { DragSource, DropTarget } from "react-dnd";
import classNames from "classnames";

import * as styles from "./styles";

/**
 * Item: DragSource methods
 */
var itemSource = {
  beginDrag: function beginDrag(props) {
    return {
      instanceKey: props.instanceKey,
      index: props.index,
      originalIndex: props.originalIndex
    };
  }
};

/**
 * Item: DragTarget methods
 */
var itemTarget = {
  drop: function drop(props, monitor) {
    props.onDrop();
  },
  hover: function hover(props, monitor, component) {
    var dragIndex = monitor.getItem().index;
    var hoverIndex = props.index;
    var dragInstanceKey = monitor.getItem().instanceKey;
    var hoverInstanceKey = props.instanceKey;

    // Don't replace items with themselves
    // or from other instances of a sortable
    if (dragInstanceKey !== hoverInstanceKey || dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    var hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    var hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    var clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    var hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveItem(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

/**
 * Item
 */

var Item = function (_React$Component) {
  _inherits(Item, _React$Component);

  function Item() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Item);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Item.__proto__ || Object.getPrototypeOf(Item)).call.apply(_ref, [this].concat(args))), _this), _this.onRemoveClick = function (e) {
      e.preventDefault();
      var _this$props = _this.props,
          canRemove = _this$props.canRemove,
          onRemove = _this$props.onRemove;

      if (canRemove && onRemove) {
        onRemove(_this.props.index, e);
      }
    }, _this.onMoveUpClick = function (e) {
      e.preventDefault();

      var _this$props2 = _this.props,
          canMoveUp = _this$props2.canMoveUp,
          moveItemUp = _this$props2.moveItemUp;


      if (canMoveUp && moveItemUp) {
        moveItemUp(_this.props.index);
      }
    }, _this.onMoveDownClick = function (e) {
      e.preventDefault();

      var _this$props3 = _this.props,
          canMoveDown = _this$props3.canMoveDown,
          moveItemDown = _this$props3.moveItemDown;


      if (canMoveDown && moveItemDown) {
        moveItemDown(_this.props.index);
      }
    }, _this.onHandleClick = function (e) {
      e.preventDefault();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * Send current `index` to the onRemove callback
   * @param  {Event} e Click event
   */


  /**
   * Send current `index` to the moveItemUp callback
   * @param {Event} e Click event
   */


  /**
  * Send current `index` to the moveItemDown callback
  * @param {Event} e Click event
  */


  /**
   * Stop the handle click propagating
   * @param  {Event} e Click event
   */


  _createClass(Item, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          canSort = _props.canSort,
          canMove = _props.canMove,
          canRemove = _props.canRemove,
          children = _props.children,
          connectDragPreview = _props.connectDragPreview,
          connectDragSource = _props.connectDragSource,
          connectDropTarget = _props.connectDropTarget,
          isDragging = _props.isDragging,
          verticalControls = _props.verticalControls,
          displayMode = _props.displayMode;

      var inline = {
        opacity: isDragging ? 0 : 1
      };

      var baseClasses = classNames(styles.base, _defineProperty({}, "" + styles.large, displayMode === "large"));

      var controlsClasses = classNames(styles.controls, _defineProperty({}, "" + styles.controlsVertical, verticalControls));

      return connectDropTarget(connectDragPreview(React.createElement(
        "div",
        { className: baseClasses, style: inline, "data-name": "sortable-item", __source: {
            fileName: _jsxFileName,
            lineNumber: 255
          },
          __self: this
        },
        React.createElement(
          "div",
          { className: styles.inner, __source: {
              fileName: _jsxFileName,
              lineNumber: 256
            },
            __self: this
          },
          children
        ),
        React.createElement(
          "div",
          { className: controlsClasses, __source: {
              fileName: _jsxFileName,
              lineNumber: 257
            },
            __self: this
          },
          canRemove ? React.createElement(
            "button",
            {
              className: styles.remove,
              onClick: this.onRemoveClick,
              title: "Remove",
              __source: {
                fileName: _jsxFileName,
                lineNumber: 259
              },
              __self: this
            },
            React.createElement(
              "span",
              { className: styles.removeText, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 264
                },
                __self: this
              },
              "Remove"
            ),
            React.createElement(
              "div",
              { className: styles.removeX, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 265
                },
                __self: this
              },
              "\xD7"
            )
          ) : null,
          canSort ? connectDragSource(React.createElement(
            "button",
            {
              className: styles.handle,
              onClick: this.onHandleClick,
              title: "Drag to reorder",
              __source: {
                fileName: _jsxFileName,
                lineNumber: 270
              },
              __self: this
            },
            React.createElement(
              "span",
              { className: styles.handleText, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 275
                },
                __self: this
              },
              "Drag to reorder"
            ),
            React.createElement("div", { className: styles.handleLine, __source: {
                fileName: _jsxFileName,
                lineNumber: 276
              },
              __self: this
            })
          )) : null,
          canMove ? React.createElement(
            "button",
            {
              className: styles.move,
              onClick: this.onMoveUpClick,
              title: "Move up",
              __source: {
                fileName: _jsxFileName,
                lineNumber: 281
              },
              __self: this
            },
            React.createElement(
              "span",
              { className: styles.handleText, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 286
                },
                __self: this
              },
              "Move up"
            ),
            React.createElement(
              "div",
              { className: styles.moveControl, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 287
                },
                __self: this
              },
              "\u2191"
            )
          ) : null,
          canMove ? React.createElement(
            "button",
            {
              className: styles.move,
              onClick: this.onMoveDownClick,
              title: "Move down",
              __source: {
                fileName: _jsxFileName,
                lineNumber: 291
              },
              __self: this
            },
            React.createElement(
              "span",
              { className: styles.handleText, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 296
                },
                __self: this
              },
              "Move down"
            ),
            React.createElement(
              "div",
              { className: styles.moveControl, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 297
                },
                __self: this
              },
              "\u2193"
            )
          ) : null
        )
      )));
    }
  }]);

  return Item;
}(React.Component);

/**
 * DropTargetDecorator
 * Set up items to behave as drop targets for sorting
 */


Item.propTypes = {
  /**
   * Current index of the item in context of the sortable
   * @type {Number}
   */
  index: PropTypes.number.isRequired,

  /**
   * The original index of the item in context of the sortable. Should only
   * differ between data updates.
   * @type {Number}
   */
  originalIndex: PropTypes.number.isRequired,

  /**
   * Callback: Fires when item is moved
   * @type {Function}
   */
  moveItem: PropTypes.func,

  /**
   * Can this item be moved via arrows?
   * @type {Boolean}
   */
  canMove: PropTypes.bool,

  /**
   * Can this item move up?
   * @type {Boolean}
   */
  canMoveUp: PropTypes.bool,

  /**
   * Can this item move down?
   * @type {Boolean}
   */
  canMoveDown: PropTypes.bool,

  /**
   * Callback: Fires when item is moved up
   * @type {Function}
   */
  moveItemUp: PropTypes.func,

  /**
   * Callback: Fires when item is moved down
   * @type {Function}
   */
  moveItemDown: PropTypes.func,

  /**
   * Can this item be removed?
   * @type {Boolean}
   */
  canRemove: PropTypes.bool,

  /**
   * Callback: Fired when item is removed
   * @type {Function}
   */
  onRemove: PropTypes.func,

  /**
   * Can this item be sorted?
   * @type {Boolean}
   */
  canSort: PropTypes.bool,

  /**
   * Is the item being dragged?
   * @type {Boolean}
   */
  isDragging: PropTypes.bool,

  /**
   * React DnD provided decorators
   * @type {Function}
   */
  connectDragPreview: PropTypes.func,
  connectDragSource: PropTypes.func,
  connectDropTarget: PropTypes.func,

  /**
   * Child component we care about sorting
   * @type {ReactElement}
   */
  children: PropTypes.node.isRequired,
  verticalControls: PropTypes.bool,

  /**
   * displayMode - affects margins, useful for large items like forms
   * supported options: large
   * @type {String}
   */
  displayMode: PropTypes.string
};
var DropTargetDecorator = DropTarget("item", itemTarget, function (connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
});

/**
 * DragSourceDecorator
 * Set up items to behave as draggable UI
 */
var DragSourceDecorator = DragSource("item", itemSource, function (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
});

/**
 * Export the decorated `<Item/>`
 */
export default DropTargetDecorator(DragSourceDecorator(Item));