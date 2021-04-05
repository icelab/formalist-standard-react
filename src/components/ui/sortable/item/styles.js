import { css } from "emotion";
import { colours, typography } from "../../styles";

export const base = css`
  ${colours.whiteBackground};
  ${colours.greyLightBorder};
  border-style: solid;
  border-width: 1px;
  display: flex;
  margin: -1px;
  padding: 0.5rem 1rem;
`;

export const large = css`
  padding: 0.1rem 1rem;
  margin-bottom: 1rem;
`;

export const inner = css`
  align-items: center;
  display: flex;
  flex: 1;
  margin-right: 1rem;
`;

export const controls = css`
  align-items: center;
  display: flex;
`;

export const controlsVertical = css`
  align-self: flex-start;
  flex-direction: column;
`;

export const handle = css`
  ${colours.primaryColor};
  appearance: none;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 1rem;
  transition-property: color;
  transition-duration: 100ms;
  position: relative;
  &:focus {
    outline: none;
  }
  &:hover,
  &:focus {
    color: ${colours.values.error};
  }
`;
export const remove = handle;

export const handleText = css`
  display: none;
`;
export const removeText = handleText;

export const handleLine = css`
  background-color: currentColor;
  border-radius: 0.3rem;
  height: 0.2rem;
  margin-top: 0.2rem;
  position: relative;
  width: 1.4rem;
  &:before,
  &:after {
    background-color: currentColor;
    border-radius: 0.3rem;
    content: "";
    height: 0.2rem;
    left: 0;
    position: absolute;
    right: 0;
  }
  &:before {
    margin-top: -0.4rem;
  }
  &:after {
    margin-top: 0.4rem;
  }
`;

export const removeX = css`
  ${typography.fallback};
  ${typography.large};
  &:hover {
    color: ${colours.values.error};
  }
`;

export const move = css`
  ${colours.primaryColor};
  appearance: none;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding-top: 1rem;
  transition-property: color;
  transition-duration: 100ms;
  position: relative;
  &:focus {
    outline: none;
  }
  &:hover,
  &:focus {
    color: ${colours.values.error};
  }
`;

export const moveControl = css`
  ${typography.fallback};
  ${typography.large};
`;
