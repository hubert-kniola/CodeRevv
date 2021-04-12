import { FunctionComponent } from 'react';

import { MessageOverlay, Title } from 'components';
import { HomeFooter, HomeNav, HomeFaq } from 'containers';

export const Home: FunctionComponent = () => (
  <>
    <HomeNav />

    <MessageOverlay active={true} title='Gratulacje!' text="Sprawdź skrzynkę mailową">
      <Title>Tu powstaje platforma testów online.</Title>

      <HomeFaq />
    </MessageOverlay>
    <HomeFooter />
  </>
);
