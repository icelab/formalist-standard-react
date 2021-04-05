import uid from "uid";
import { css } from "emotion";
import { colours, typography } from "../ui/styles";


export const label = css`
  ${typography.headerSmallCaps};
  border-bottom: 3px solid ${colours.values.greyLight};
  margin-bottom: 1.8rem;
  padding-bottom: 1.8rem;
  flex: 1;
`;

export const previewImage = css`
  max-height: 5rem;
  margin-bottom: 1.8rem;
  margin-left: 1.8rem;
`;

export const wrapper = css`
  align-items: center;
  display: flex;
  padding: 0;
  width: 100%;
`;

export const children = uid(10); // Empty placeholder class
