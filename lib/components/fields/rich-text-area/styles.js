import uid from "uid";
import { css } from "emotion";
import * as fields from "../field-styles";

export var base = /*#__PURE__*/css(fields.base, ";");

export var baseInline = /*#__PURE__*/css(fields.baseInline, ";");

export var header = /*#__PURE__*/css(fields.header, ";");

export var display = uid(10); // Empty placeholder class