import uid from "uid";
import { css } from "emotion";
import { buttons, colours, typography } from "../styles";

export var dropzoneContainer = /*#__PURE__*/css("&:focus{outline:none;}");

/**
 * dropzone
 * this element cannot always be positioned relative.
 * when this field is 'relative' it's sortable children "lose" elements when dragging.
 * This element does need to be 'relative' at times to display it's label element
 * vertically aligned.
 * When the dropzone is empty, or on window drag, we position this element 'relative'
 */

export var dropzone = /*#__PURE__*/css(colours.greyLightColor, ";", typography.small, ";", typography.sans, ";min-height:71px;transition:background-color 0.3s;position:relative;width:100%;z-index:1;&:hover{cursor:pointer;}");

export var dropzone__empty = /*#__PURE__*/css("position:relative;");
export var dropzone__drag_over = /*#__PURE__*/css("position:relative;> div{opacity:0;}");

// Empty classes behave oddly
export var dropzone__active = uid(10); // Empty placeholder class
export var dropzone__disable_hover = uid(10); // Empty placeholder class

/**
 * dropzone__label__wrapper
 * This is the coloured block that hides existing uploaded files.
 * We only show this when dragging files on the window or when the dropzone
 * is empty.
 */

/* add a psuedo element with the dash border *behind* the label so
that it doesn't glitchy state changes when hovered/dragged over */

export var dropzone__label__wrapper = /*#__PURE__*/css("background:transparent;bottom:0;left:0;position:absolute;right:0;top:0;width:100%;z-index:-1;&:after{background-color:transparent;border:1px dashed ", colours.values.greyLight, ";bottom:0;box-sizing:border-box;content:\"\";display:block;left:0;position:absolute;right:0;top:0;z-index:-2;.", dropzone__empty, ":hover &{border-color:", colours.values.greyMid, ";}.", dropzone__drag_over, " &{border-color:", colours.values.greyMid, ";}// Dragging on the window and then over the dropzone state\n    .", dropzone__disable_hover, ".", dropzone__drag_over, ".", dropzone__active, " &,.", dropzone__drag_over, ".", dropzone__active, " &{border-color:", colours.values.highlight, ";}}.", dropzone__disable_hover, ".", dropzone__active, ":hover &{display:none;}.", dropzone__disable_hover, ".", dropzone__drag_over, ".", dropzone__active, ":hover &,.", dropzone__drag_over, " &,.", dropzone__active, " &,.", dropzone__empty, " &{display:block;}// Empty\n  .", dropzone__empty, " &{background-color:transparent;}// Dragging\n  .", dropzone__drag_over, " &{background:rgba(245,245,245,0.7);}// Dragging on the window and then over the dropzone state\n  .", dropzone__disable_hover, ".", dropzone__drag_over, ".", dropzone__active, " &,.", dropzone__drag_over, ".", dropzone__active, " &{background:rgba(127,194,234,0.3);}");

/**
 * dropzone__label
 * visibility of this element is dictated by dropzone__label__wrapper
 */

export var dropzone__label = /*#__PURE__*/css(colours.greyLightColor, ";display:inline-block;left:50%;position:absolute;top:50%;transform:translateX(-50%) translateY(-50%);transition:color 0.25s;z-index:1;.", dropzone__empty, " &{&:hover{color:", colours.values.greyMid, ";}}.", dropzone__drag_over, " &,.", dropzone__empty, " &{color:", colours.values.greyMid, ";}.", dropzone__drag_over, ".", dropzone__active, " &{color:", colours.values.highlight, ";}");

/**
 * dropzone button
 * This button is positioned inside of the multi-upload-field component.
 * Because the multi-upload-field cannot be positioned 'relative' by default
 * (due to Sortable Items losing elements on drag) we have to float this to
 * the right and apply negative margin to position it in the multi-upload-field
 * field header
 */

export var dropzone__button = /*#__PURE__*/css(buttons.small, ";", buttons.buttonHighlight, ";float:right;margin-top:-3.4rem;");