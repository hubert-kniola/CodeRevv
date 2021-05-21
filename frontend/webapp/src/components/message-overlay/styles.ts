import styled, { css } from 'styled-components';
import LoadingOverlay from 'react-loading-overlay-ts';

import logo from 'images/logo.png';

export const DummyContainer = styled.div`
  display: grid;
  height: 100px;
`;

export const InnerContainer = styled.div`
  display: grid;
  height: 200px;
`;

export const Overlay = styled(LoadingOverlay)`
  ._loading_overlay_overlay {
    background-color: ${({ theme }) => theme.colors.alphabg};
    border: 0 solid ${({ theme }) => theme.colors.alphabg};
    box-shadow: 0 0 50px 50px ${({ theme }) => theme.colors.alphabg};
  }
`;

export const Title = styled.h1`
  font-size: 50px;
  line-height: 0.9;
  margin-top: 0;
  margin-bottom: 40px;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;

  @media (max-width: 600px) {
    font-size: 35px;
  }
`;

export const Body = styled.p`
  white-space: pre-wrap;
  font-size: 20px;
  font-weight: normal;
  line-height: normal;
  color: ${({ theme }) => theme.colors.text};
  max-width: 800px;

  @media (max-width: 600px) {
    font-size: 16px;
    line-height: 22px;
  }
`;

export const Logo = styled.img`
  height: 5rem;
  pointer-events: none;
  margin-top: 20px;

  ${({ theme }) =>
    theme.name === 'light' &&
    css`
      filter: invert(1);
    `}

  transition: all 0.2s ease-in-out;
`;

Logo.defaultProps = { src: logo, alt: 'logo' };
