import React from 'react'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import classNames from 'classnames'

import styles from './item.mcss'

/**
 * Item: DragSource methods
 */
const itemSource = {
  beginDrag (props) {
    return {
      instanceKey: props.instanceKey,
      index: props.index,
      originalIndex: props.originalIndex
    }
  }
}

/**
 * Item: DragTarget methods
 */
const itemTarget = {
  drop (props, monitor) {
    props.onDrop()
  },

  hover (props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index
    const dragInstanceKey = monitor.getItem().instanceKey
    const hoverInstanceKey = props.instanceKey

    // Don't replace items with themselves
    // or from other instances of a sortable
    if (dragInstanceKey !== hoverInstanceKey || dragIndex === hoverIndex) {
      return
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

    // Determine mouse position
    const clientOffset = monitor.getClientOffset()

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }

    // Time to actually perform the action
    props.moveItem(dragIndex, hoverIndex)

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex
  }
}

/**
 * Item
 */
const Item = React.createClass({

  propTypes: {

    /**
     * Current index of the item in context of the sortable
     * @type {Number}
     */
    index: React.PropTypes.number.isRequired,

    /**
     * The original index of the item in context of the sortable. Should only
     * differ between data updates.
     * @type {Number}
     */
    originalIndex: React.PropTypes.number.isRequired,

    /**
     * Callback: Fires when item is moved
     * @type {Function}
     */
    moveItem: React.PropTypes.func,

    /**
     * Can this item be removed?
     * @type {Boolean}
     */
    canRemove: React.PropTypes.bool,

    /**
     * Callback: Fired when item is removed
     * @type {Function}
     */
    onRemove: React.PropTypes.func,

    /**
     * Can this item be sorted?
     * @type {Boolean}
     */
    canSort: React.PropTypes.bool,

    /**
     * Is the item being dragged?
     * @type {Boolean}
     */
    isDragging: React.PropTypes.bool,

    /**
     * React DnD provided decorators
     * @type {Function}
     */
    connectDragPreview: React.PropTypes.func,
    connectDragSource: React.PropTypes.func,
    connectDropTarget: React.PropTypes.func,

    /**
     * Child component we care about sorting
     * @type {ReactElement}
     */
    children: React.PropTypes.node.isRequired,
    verticalControls: React.PropTypes.bool
  },

  /**
   * Send current `index` and click event to the onRemove callback
   * @param  {Event} e Click event
   */
  onRemoveClick (e) {
    e.preventDefault()
    const { canRemove, onRemove } = this.props
    if (canRemove && onRemove) {
      onRemove(this.props.index, e)
    }
    ree
  },

  /**
   * Stop the handle click propagating
   * @param  {Event} e Click event
   */
  onHandleClick (e) {
    e.preventDefault()
  },

  render () {
    const { canSort, canRemove, children, connectDragPreview, connectDragSource, connectDropTarget, isDragging, verticalControls } = this.props
    const inline = {
      opacity: (isDragging) ? 0 : 1
    }

    const controlsClasses = classNames(
      styles.controls,
      {
        [`${styles.controlsVertical}`]: verticalControls
      }
    )

    return connectDropTarget(
      connectDragPreview(
        <div className={styles.base} style={inline}  data-name="sortable-item">
          <div className={styles.inner}>
            {children}
          </div>
          <div className={controlsClasses}>
            {canRemove ? <button className={styles.remove} onClick={this.onRemoveClick}>
              <span className={styles.removeText}>Remove</span>
              <div className={styles.removeX}>×</div>
            </button> : null}
            {canSort ? connectDragSource(
              <button className={styles.handle} onClick={this.onHandleClick}>
                <span className={styles.handleText}>Drag to reorder</span>
                <div className={styles.handleLine}/>
              </button>) : null}
          </div>
        </div>
      )
    )
  }
})

/**
 * DropTargetDecorator
 * Set up items to behave as drop targets for sorting
 */
const DropTargetDecorator = DropTarget('item', itemTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))

/**
 * DragSourceDecorator
 * Set up items to behave as draggable UI
 */
const DragSourceDecorator = DragSource('item', itemSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
}))

/**
 * Export the decorated `<Item/>`
 */
export default DropTargetDecorator(DragSourceDecorator(Item))
