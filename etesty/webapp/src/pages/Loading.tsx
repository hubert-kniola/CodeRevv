import { FunctionComponent } from 'react';

import { HomeFooter, HomeNav } from 'containers';
import { LoadingOverlay } from 'components';

export const Loading: FunctionComponent = () => (
  <>
    <HomeNav />

    <LoadingOverlay active={true} text="Jeszcze moment...">
      <div style={{ height: '300px' }} />
    </LoadingOverlay>

    <HomeFooter />
  </>
);
