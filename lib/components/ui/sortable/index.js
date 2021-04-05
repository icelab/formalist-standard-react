var _jsxFileName = "src/components/ui/sortable/index.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import uid from "uid";
import update from "react-addons-update";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import Item from "./item";

import * as styles from "./styles";

/**
 * Container for a sortable set of items
 *
 * <Sortable canRemove onRemove={(index) => ... } onSort={(newOrder) => ...}>
 *   <item/>
 *   <image/>
 *   {otherItems}
 * </Sortable>
 */

var Sortable = function (_React$Component) {
  _inherits(Sortable, _React$Component);

  function Sortable() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Sortable);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Sortable.__proto__ || Object.getPrototypeOf(Sortable)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      instanceKey: uid(),
      items: React.Children.map(_this.props.children, function (child, index) {
        return {
          component: child,
          originalIndex: index
        };
      })
    }, _this.onDrop = function () {
      if (_this.props.onDrop) {
        _this.props.onDrop(_this.state.items.map(function (item) {
          return item.originalIndex;
        }));
      }
    }, _this.onSort = function () {
      if (_this.props.onSort) {
        _this.props.onSort(_this.state.items.map(function (item) {
          return item.originalIndex;
        }));
      }
    }, _this.moveItem = function (dragIndex, hoverIndex) {
      var items = _this.state.items;

      var dragItem = items[dragIndex];
      _this.setState(update(_this.state, {
        items: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragItem]]
        }
      }));
    }, _this.moveItemUp = function (itemIndex) {
      var items = _this.state.items;

      // If the item is already first, do nothing

      if (itemIndex === 0) {
        return;
      }

      var currentOrder = items.map(function (item, index) {
        return index;
      });

      var newOrder = update(currentOrder, {
        $splice: [[itemIndex, 1], [itemIndex - 1, 0, itemIndex]]
      });

      _this.props.onMove(newOrder);
    }, _this.moveItemDown = function (itemIndex) {
      var items = _this.state.items;

      // If the item is already last, do nothing

      if (itemIndex === items.length - 1) {
        return;
      }

      var currentOrder = items.map(function (item, index) {
        return index;
      });

      var newOrder = update(currentOrder, {
        $splice: [[itemIndex, 1], [itemIndex + 1, 0, itemIndex]]
      });

      _this.props.onMove(newOrder);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Sortable, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        items: React.Children.map(nextProps.children, function (child, index) {
          return {
            component: child,
            originalIndex: index
          };
        })
      });
    }

    /**
     * onDrop
     *
     * Updates the internal representation of the list, and propagates that data
     * changes upward through `this.props.onDrop`
     */


    /**
     * onSort
     *
     * Updates the internal representation of the list, and propagates that data
     * changes upward through `this.props.onSort`
     */


    /**
     * moveItem
     *
     * Updates the internal representation of the list
     *
     * @param  {Number} dragIndex The current index of the item being dragged
     * @param  {Number} hoverIndex The current index of the item being hovered
     */

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          instanceKey = _state.instanceKey,
          items = _state.items;
      var _props = this.props,
          canRemove = _props.canRemove,
          onRemove = _props.onRemove,
          verticalControls = _props.verticalControls,
          canSort = _props.canSort,
          canMove = _props.canMove,
          maxHeight = _props.maxHeight,
          itemDisplayMode = _props.itemDisplayMode;

      var isSortable = !(canSort === false || items.length <= 1);
      var isMovable = !(canMove === false || items.length <= 1);

      var wrapperClassNames = classNames(_defineProperty({}, "" + styles.maxHeightWrapper, maxHeight != null));

      var baseClassNames = classNames(styles.base, _defineProperty({}, "" + styles.maxHeightBase(maxHeight), maxHeight != null));

      return React.createElement(
        "div",
        { className: wrapperClassNames, __source: {
            fileName: _jsxFileName,
            lineNumber: 217
          },
          __self: this
        },
        React.createElement(
          "div",
          { className: baseClassNames, "data-name": "sortable-item", __source: {
              fileName: _jsxFileName,
              lineNumber: 218
            },
            __self: this
          },
          items.map(function (item, index) {
            return React.createElement(
              Item,
              {
                key: instanceKey + "_" + item.originalIndex,
                instanceKey: instanceKey,
                moveItem: _this2.moveItem,
                moveItemUp: _this2.moveItemUp,
                moveItemDown: _this2.moveItemDown,
                canMove: isMovable,
                canMoveUp: isMovable && index > 0,
                canMoveDown: isMovable && index < items.length - 1,
                onDrop: _this2.onDrop,
                index: index,
                originalIndex: item.originalIndex,
                canSort: isSortable,
                canRemove: canRemove,
                onRemove: onRemove,
                verticalControls: verticalControls,
                displayMode: itemDisplayMode,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 220
                },
                __self: _this2
              },
              item.component
            );
          })
        )
      );
    }
  }]);

  return Sortable;
}(React.Component);

Sortable.propTypes = {
  /**
   * canRemove
   * Indicates whether items are removable
   * @type {Boolean}
   */
  canRemove: PropTypes.bool,
  /**
   * canSort
   * Indicates whether list is sortable
   * @type {Boolean}
   */
  canSort: PropTypes.bool,
  /**
   * canMove
   * Indicates whether list items can be moved via arrows
   * @type {Boolean}
   */
  canMove: PropTypes.bool,
  children: PropTypes.node,
  /**
   * maxHeight
   * CSS max-height value to limit the size of the sortable
   * @type {String}
   */
  maxHeight: PropTypes.string,
  /**
   * onDrop
   * Callback. Fired _after_ the sort is effected
   * @type {Function}
   */
  onDrop: PropTypes.func,
  /**
   * onRemove
   * Callback. Fired when the remove button is clicked. Is passed the
   * *current* index of the item to be removed
   * @type {Function}
   */
  onRemove: PropTypes.func,
  /**
   * onMove
   * Callback. Fired when items are moved up or down.
   * Passed the new order for the children.
   * @type {Function}
   */
  onMove: PropTypes.func,
  /**
   * onSort
   * Callback. Fired when the sort change is effected
   * @type {Function}
   */
  onSort: PropTypes.func,
  /**
   * verticalControls
   * Stack sort controls vertically
   * @type {Boolean}
   */
  verticalControls: PropTypes.bool,
  /**
   * itemDisplayMode
   * The display mode for items.
   * Supported values: "large".
   * @type {String}
   */
  itemDisplayMode: PropTypes.string
};
Sortable.defaultProps = {
  canMove: false,
  canSort: true,
  verticalControls: false
};


export default DragDropContext(HTML5Backend)(Sortable);