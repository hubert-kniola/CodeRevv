import { FunctionComponent } from 'react';
import { LinkProps } from 'react-router-dom';
import { CenteredContainer, StyledLink } from './styles';

export const CenteredLink: FunctionComponent<LinkProps> = ({ children, ...restProps }) => (
  <CenteredContainer>
    <StyledLink {...restProps}>{children}</StyledLink>
  </CenteredContainer>
);
