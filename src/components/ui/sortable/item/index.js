import React from "react";
import PropTypes from "prop-types";
import { findDOMNode } from "react-dom";
import { DragSource, DropTarget } from "react-dnd";
import classNames from "classnames";

import * as styles from "./styles";

/**
 * Item: DragSource methods
 */
const itemSource = {
  beginDrag(props) {
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
const itemTarget = {
  drop(props, monitor) {
    props.onDrop();
  },

  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    const dragInstanceKey = monitor.getItem().instanceKey;
    const hoverInstanceKey = props.instanceKey;

    // Don't replace items with themselves
    // or from other instances of a sortable
    if (dragInstanceKey !== hoverInstanceKey || dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

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
class Item extends React.Component {
  static propTypes = {
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

  /**
   * Send current `index` to the onRemove callback
   * @param  {Event} e Click event
   */
  onRemoveClick = e => {
    e.preventDefault();
    const { canRemove, onRemove } = this.props;
    if (canRemove && onRemove) {
      onRemove(this.props.index, e);
    }
  };

  /**
   * Send current `index` to the moveItemUp callback
   * @param {Event} e Click event
   */
  onMoveUpClick = e => {
    e.preventDefault();

    const { canMoveUp, moveItemUp } = this.props;

    if (canMoveUp && moveItemUp) {
      moveItemUp(this.props.index);
    }
  };

   /**
   * Send current `index` to the moveItemDown callback
   * @param {Event} e Click event
   */
  onMoveDownClick = e => {
    e.preventDefault();

    const { canMoveDown, moveItemDown } = this.props;

    if (canMoveDown && moveItemDown) {
      moveItemDown(this.props.index);
    }
  };

  /**
   * Stop the handle click propagating
   * @param  {Event} e Click event
   */
  onHandleClick = e => {
    e.preventDefault();
  };

  render() {
    const {
      canSort,
      canMove,
      canRemove,
      children,
      connectDragPreview,
      connectDragSource,
      connectDropTarget,
      isDragging,
      verticalControls,
      displayMode
    } = this.props;
    const inline = {
      opacity: isDragging ? 0 : 1
    };

    const baseClasses = classNames(styles.base, {
      [`${styles.large}`]: displayMode === "large"
    });

    const controlsClasses = classNames(styles.controls, {
      [`${styles.controlsVertical}`]: verticalControls
    });

    return connectDropTarget(
      connectDragPreview(
        <div className={baseClasses} style={inline} data-name="sortable-item">
          <div className={styles.inner}>{children}</div>
          <div className={controlsClasses}>
            {canRemove ? (
              <button
                className={styles.remove}
                onClick={this.onRemoveClick}
                title="Remove"
              >
                <span className={styles.removeText}>Remove</span>
                <div className={styles.removeX}>×</div>
              </button>
            ) : null}
            {canSort
              ? connectDragSource(
                  <button
                    className={styles.handle}
                    onClick={this.onHandleClick}
                    title="Drag to reorder"
                  >
                    <span className={styles.handleText}>Drag to reorder</span>
                    <div className={styles.handleLine} />
                  </button>
                )
              : null}
            {canMove ? (
              <button
                className={styles.move}
                onClick={this.onMoveUpClick}
                title="Move up"
              >
                <span className={styles.handleText}>Move up</span>
                <div className={styles.moveControl}>↑</div>
              </button>
            ) : null}
            {canMove ? (
              <button
                className={styles.move}
                onClick={this.onMoveDownClick}
                title="Move down"
              >
                <span className={styles.handleText}>Move down</span>
                <div className={styles.moveControl}>↓</div>
              </button>
            ) : null}
          </div>
        </div>
      )
    );
  }
}

/**
 * DropTargetDecorator
 * Set up items to behave as drop targets for sorting
 */
const DropTargetDecorator = DropTarget("item", itemTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}));

/**
 * DragSourceDecorator
 * Set up items to behave as draggable UI
 */
const DragSourceDecorator = DragSource(
  "item",
  itemSource,
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  })
);

/**
 * Export the decorated `<Item/>`
 */
export default DropTargetDecorator(DragSourceDecorator(Item));
