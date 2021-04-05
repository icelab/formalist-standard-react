import uid from "uid";
import { css } from "emotion";
import { colours, typography } from "../ui/styles";

export const base = css`
  margin-bottom: 5rem;
`;

export const label = css`
  ${typography.headerSmallCaps};
  border-bottom: 3px solid ${colours.values.greyLight};
  margin-bottom: 1.8rem;
  padding-bottom: 1.8rem;
`;

export const children = uid(10); // Empty placeholder class
