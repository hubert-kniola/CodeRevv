import { FunctionComponent } from 'react';

import { HomeNav, HomeFooter } from 'containers';
import { MessageOverlay } from 'components';

export const NotFound: FunctionComponent = () => (
  <>
    <HomeNav />

    <MessageOverlay active={true} title="Ooops..." text="Chyba nie obsługujemy takiego adresu :(" />

    <HomeFooter />
  </>
);
