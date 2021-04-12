import { FunctionComponent } from 'react';

import { LoadingOverlay } from 'components';

export const Loading: FunctionComponent = () => (
  <>
    <LoadingOverlay active={true} text="Jeszcze moment...">
      <div style={{ height: '300px' }} />
    </LoadingOverlay>
  </>
);
