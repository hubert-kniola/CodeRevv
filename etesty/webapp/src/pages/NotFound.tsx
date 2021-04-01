import { FunctionComponent } from 'react';

import { HomeNav, HomeFooter } from 'containers';
import { Title } from 'components';

export const NotFound: FunctionComponent = () => (
  <>
    <HomeNav />

    <Title>Ups, to mi wygląda na 404...</Title>

    <HomeFooter />
  </>
);
