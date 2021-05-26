import { FunctionComponent } from 'react';
import { LinkProps } from 'react-router-dom';
import { CenteredContainer, StyledLink } from './styles';

interface CLP extends LinkProps {
  big?: boolean;
}

export const CenteredLink: FunctionComponent<CLP> = ({ children, ...restProps }) => (
  <CenteredContainer>
    <StyledLink {...restProps}>{children}</StyledLink>
  </CenteredContainer>
);
