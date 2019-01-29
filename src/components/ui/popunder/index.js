import React from "react";
import PropTypes from "prop-types";
import Portal from "../portal";
import * as styles from "./styles";
import classNames from "classnames";

/**
 * A "popunder" component. Creates a element that hangs under the passed
 * `reference` element.
 *
 * The reference element is the node that the popunder takes its position from
 * it’s expected that this is the _first_ element in `props.children`.
 *
 * All other children are assumed to be part of the content of the underhanging
 * `container` and will be rendered there in order. The `container` is rendered
 * into a `Portal`, which an element that’s appended to the `<body>` to avoid
 * any DOM flow complications.
 *
 * Takes an `props.offset {top, left}` to adjust position
 *
 * Exposes:
 *
 * @method calculatePosition
 * @method openPopunder
 * @method closePopunder
 * @method getContainer
 */
class Popunder extends React.Component {
  static propTypes = {
    beforeClose: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string,
    closeOnEsc: PropTypes.bool,
    closeOnOutsideClick: PropTypes.bool,
    offset: PropTypes.shape({
      left: PropTypes.number,
      top: PropTypes.number
    }),
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onUpdate: PropTypes.func,
    containerClassName: PropTypes.string,
    testId: PropTypes.string
  };

  static defaultProps = {
    offset: {
      left: 0,
      top: 0
    }
  };

  state = {
    isOpened: false,
    position: {
      left: 0,
      top: 0
    }
  };

  componentDidMount() {
    window.requestAnimationFrame(this.calculatePosition);
  }

  componentWillMount() {
    const { closeOnOutsideClick } = this.props;
    window.addEventListener("resize", this.onResize);
    document.addEventListener("keydown", this.handleKeydown);
    if (closeOnOutsideClick) {
      document.addEventListener("mouseup", this.handleOutsideMouseClick);
      document.addEventListener("touchstart", this.handleOutsideMouseClick);
    }
  }

  componentWillUnmount() {
    const { closeOnOutsideClick } = this.props;
    document.removeEventListener("resize", this.onResize);
    document.removeEventListener("keydown", this.handleKeydown);
    if (closeOnOutsideClick) {
      document.removeEventListener("mouseup", this.handleOutsideMouseClick);
      document.removeEventListener("touchstart", this.handleOutsideMouseClick);
    }
  }

  /**
   * Public interface: Calculate the position of the popunder wrapper
   * @return {Object} Updated position we're setting
   */
  calculatePosition = () => {
    // Only bother if its rendered
    if (!this._reference) {
      return;
    }
    const referencePosition = this._reference.getBoundingClientRect();
    const scrollX = window.pageXOffset;
    const scrollY = window.pageYOffset;
    let position = {
      left: referencePosition.left + scrollX + this.props.offset.left,
      top:
        referencePosition.top +
        scrollY +
        referencePosition.height +
        this.props.offset.top
    };
    this.setState({
      position
    });
    return position;
  };

  /**
   * Public interface: Opens the `Portal`
   */
  openPopunder = () => {
    this.calculatePosition();
    this.setState({
      isOpened: true
    });
  };

  /**
   * Public: Close the `Portal`
   */
  closePopunder = () => {
    this.setState({
      isOpened: false
    });
  };

  /**
   * Public: Toggle the `Portal`
   */
  togglePopunder = () => {
    this.isOpened ? this.closePopunder() : this.openPopunder();
  };

  /**
   * Return the `container` node
   */
  getContainer = () => {
    return this._container;
  };

  /**
   * Close the portal if a click-outside occurs
   * @param  {Event} e MouseUp/TouchStart event
   * @return {Null}
   */
  handleOutsideMouseClick = e => {
    if (!this.state.isOpened) {
      return;
    }

    // Extract the elements based on `ref` values. The actual portal element is
    // nested within the portal instance as it gets rendered out of
    // context
    const portalEl = this._portal.getContainer();
    const referenceEl = this._reference;

    if (
      (portalEl && portalEl.contains(e.target)) ||
      (referenceEl && referenceEl.contains(e.target))
    ) {
      return;
    }

    e.stopPropagation();
    this.closePopunder();
  };

  /**
   * Close portal if escape is pressed
   * @param  {KeyboardEvent} e
   */
  handleKeydown = e => {
    const { closeOnEsc } = this.props;
    // ESCAPE = 27
    if (closeOnEsc && e.keyCode === 27 && this.state.isOpened) {
      this.closePopunder();
    }
  };

  /**
   * Handle position on resize
   * @param  {Event} e ResizeEvent
   */
  onResize = e => {
    this.calculatePosition();
  };

  /**
   * Keep track of open/close state
   */
  onOpen = () => {
    const { onOpen } = this.props;
    if (onOpen) {
      onOpen();
    }
  };

  /**
   * Keep track of open/close state
   */
  onClose = () => {
    const { onClose } = this.props;
    if (onClose) {
      onClose();
    }
  };

  render() {
    // Extract Portal props
    let {
      beforeClose,
      className,
      onUpdate,
      containerClassName,
      testId
    } = this.props;

    let { isOpened, position } = this.state;

    // Extract the reference element
    // AKA child.first
    let children = React.Children.toArray(this.props.children);
    let reference = children[0];
    let portalContent = children.slice(1);

    const containerClassNames = classNames(
      styles.container,
      containerClassName
    );

    return (
      <div className={className}>
        <div
          ref={c => {
            this._reference = c;
          }}
        >
          {reference}
        </div>
        <Portal
          ref={c => {
            this._portal = c;
          }}
          beforeClose={beforeClose}
          isOpened={isOpened}
          onOpen={this.onOpen}
          onClose={this.onClose}
          onUpdate={onUpdate}
        >
          <div
            className={containerClassNames}
            data-testid={testId}
            ref={c => {
              this._container = c;
            }}
            style={position}
          >
            {portalContent}
          </div>
        </Portal>
      </div>
    );
  }
}

export default Popunder;
