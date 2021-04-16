import { FunctionComponent } from 'react';

import { LoadingOverlay } from 'components';

export const Loading: FunctionComponent = () => (
  <>
    <LoadingOverlay active={true} text="Jeszcze moment..." logo>
      <div style={{ height: '100vh' }} />
    </LoadingOverlay>
  </>
);
