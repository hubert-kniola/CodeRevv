import { HomeNav, HomeFooter } from 'containers';
import { Title } from 'components';

const NotFound = () => {
  return (
    <>
      <HomeNav />

      <Title>Ups, to mi wygląda na 404...</Title>

      <HomeFooter />
    </>
  );
};

export default NotFound;
