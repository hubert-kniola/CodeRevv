import { FunctionComponent } from 'react';

import { HomeFooter, HomeNav } from 'containers';
import { Title } from 'components';

const Contact: FunctionComponent = () => (
  <>
    <HomeNav />

    <Title>Zapraszamy do kontaktu!</Title>

    <HomeFooter />
  </>
);

export default Contact;
