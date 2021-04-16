import { FunctionComponent } from 'react';

import { Title } from 'components';
import { HomeFooter, HomeNav, HomeFaq } from 'containers';

export const Home: FunctionComponent = () => (
  <>
    <HomeNav />

    <Title>Tu powstaje platforma testów online.</Title>

    <HomeFaq />

    <HomeFooter />
  </>
);
