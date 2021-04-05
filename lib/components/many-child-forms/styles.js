import { css } from "emotion";
import { buttons, colours, inputBoxes, typography } from "../ui/styles";

export var base = /*#__PURE__*/css("margin-bottom:5rem;");

export var header = /*#__PURE__*/css("display:flex;align-items:center;padding-bottom:1.5rem;");

export var label = /*#__PURE__*/css(typography.headerSmallCaps, ";margin-right:auto;");
export var labelErrors = /*#__PURE__*/css(colours.errorColor, ";");

export var placeholder = /*#__PURE__*/css(inputBoxes.inputBox, ";");

export var placeholderText = /*#__PURE__*/css(colours.greyMidColor, ";display:inline-block;padding-top:0.3rem;padding-bottom:0.4rem;margin-right:0.5rem;");
export var placeholderButton = /*#__PURE__*/css(colours.highlightDarkColor, ";text-decoration:underline;");

export var controls = /*#__PURE__*/css("margin-left:auto;");

export var addButton = /*#__PURE__*/css(buttons.small, ";", buttons.buttonHighlight, ";");

export var set = /*#__PURE__*/css("padding-left:0.6rem;padding-top:1rem;width:100%;");

export var selectionPlaceholder = /*#__PURE__*/css(colours.greyMidColor, ";", typography.normal, ";", typography.sans, ";align-items:center;display:flex;flex:1;text-align:left;min-height:2rem;");

export var openSelectorButton = /*#__PURE__*/css(buttons.small, ";", buttons.buttonHighlight, ";margin-right:-0.3rem;margin-top:-0.2rem;margin-bottom:-0.4rem;");

/**
 * Selections
 */

export var options = /*#__PURE__*/css("min-width:30rem;");

export var optionsList = /*#__PURE__*/css("max-height:40rem;overflow-y:scroll;overflow-scroll:touch;padding-top:0.5rem;");

export var noResults = /*#__PURE__*/css(typography.normal, ";", typography.sans, ";padding:0.5em 1rem 0.7em;");

export var search = /*#__PURE__*/css(typography.normal, ";", typography.sans, ";", colours.greyTintBorder, ";appearance:none;border-width:0;border-bottom-width:1px;border-bottom-style:solid;box-sizing:border-box;box-shadow:0 2px 0 0 rgba(0,0,0,0.02);padding:0.5em 0.5em 0.7em 0.5em;position:relative;width:100%;z-index:1;&:focus{outline:none;}");

export var optionButton = /*#__PURE__*/css(typography.normal, ";", typography.sans, ";", colours.greyTintBorder, ";", colours.whiteBackground, ";border-width:0;border-bottom-width:1px;border-style:solid;cursor:pointer;display:block;padding:0.7rem 1rem;text-align:left;width:100%;&:hover{text-decoration:underline;}strong{font-weight:", typography.fonts.weights.sansBold, ";}italic{font-style:italic;}");