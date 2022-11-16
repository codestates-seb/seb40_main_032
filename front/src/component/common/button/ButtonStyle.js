import styled, { css } from 'styled-components';

const ButtonStyle = css`
  background: var(--button-theme);
  color: var(--button-font-color);
  font-size: ${props => props.fontSize};
  height: ${props => props.height};
  width: ${props => props.width};
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  font-weight: ${props => props.fontWeight};
  border: none;
  text-align: center;
  border-radius: var(--radius-10);
  cursor: pointer;
`;

export const DefaultButton = styled.button`
  ${ButtonStyle}

  &:active {
    background: var(--button-theme-hv);
    color: var(--base-white-color);
  }
`;

export const NegativeButton = styled.button`
  ${ButtonStyle}
  background: var(--button-font-color);
  color: var(--font-base-grey);

  &:active {
    background: var(--holder-base-color);
    color: var(--base-white-color);
  }
`;

export const TransparentButton = styled.button`
  ${ButtonStyle}
  background: transparent;
  color: var(--button-theme);

  &:active {
    color: var(--button-theme-hv);
  }
`;
