import { css, injectGlobal } from "emotion";
import { colours, inputBoxes } from "../styles";

export var base = /*#__PURE__*/css(inputBoxes.inputBox, ";display:flex;padding:0;");

export var gutter = /*#__PURE__*/css("border-right:1px solid ", colours.values.greyLight, ";position:relative;width:5rem;");

export var content = /*#__PURE__*/css("padding:2rem 2rem 1rem;flex:1;");

export var contentPlaceholderUnorderedListItem = /*#__PURE__*/css("visibility:inherit;");
export var contentPlaceholderOrderedListItem = /*#__PURE__*/css("visibility:inherit;");
export var contentPlaceholderHeaderOne = /*#__PURE__*/css("visibility:inherit;");

injectGlobal(".public-DraftEditorPlaceholder-root{.", contentPlaceholderUnorderedListItem, " &,.", contentPlaceholderOrderedListItem, " &{margin-left:1.5rem;}.", contentPlaceholderHeaderOne, " &{margin-left:0.2rem;}}");