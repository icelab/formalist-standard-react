import uid from "uid";
import { css } from "emotion";
import { colours, typography } from "../ui/styles";

export var base = /*#__PURE__*/css("margin-bottom:5rem;");

export var label = /*#__PURE__*/css(typography.headerSmallCaps, ";border-bottom:3px solid ", colours.values.greyLight, ";margin-bottom:1.8rem;padding-bottom:1.8rem;");

export var children = uid(10); // Empty placeholder class