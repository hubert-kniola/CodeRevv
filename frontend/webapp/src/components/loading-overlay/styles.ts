import styled from 'styled-components';
import LoadingOverlay from 'react-loading-overlay-ts';

export const Overlay = styled(LoadingOverlay)`
  ._loading_overlay_overlay {
    background-color: ${({ theme }) => theme.colors.alphabg};
    border: 0 solid ${({ theme }) => theme.colors.alphabg};
    box-shadow: 0 0 50px 50px ${({ theme }) => theme.colors.alphabg};
  }
`;
