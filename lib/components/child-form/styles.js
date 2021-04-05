import uid from "uid";
import { css } from "emotion";
import { colours, typography } from "../ui/styles";

export var label = /*#__PURE__*/css(typography.headerSmallCaps, ";border-bottom:3px solid ", colours.values.greyLight, ";margin-bottom:1.8rem;padding-bottom:1.8rem;flex:1;");

export var previewImage = /*#__PURE__*/css("max-height:5rem;margin-bottom:1.8rem;margin-left:1.8rem;");

export var wrapper = /*#__PURE__*/css("align-items:center;display:flex;padding:0;width:100%;");

export var children = uid(10); // Empty placeholder class