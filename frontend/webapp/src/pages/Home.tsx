import { FunctionComponent } from 'react';

import { CenteredLink, Title } from 'components';
import { HomeFooter, HomeNav, HomeFaq } from 'containers';

export const Home: FunctionComponent = () => (
  <>
    <HomeNav />

    <Title>Tu powstaje platforma testów online.</Title>

    <HomeFaq />

    <Title>Zapraszamy do kontaktu!</Title>

    <CenteredLink to="#" big>
      <code onClick={() => window.location.replace('mailto:coderevv@gmail.com?subject=Pytanie o CodeRevv')}>
        coderevv@gmail.com
      </code>
    </CenteredLink>

    <HomeFooter />
  </>
);
