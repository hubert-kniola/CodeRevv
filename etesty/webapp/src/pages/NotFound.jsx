import { HomeNavContainer, HomeFooterContainer } from '../containers';
import { Title } from '../components';

const NotFound = ({ history }) => {
  return (
    <>
      <HomeNavContainer />

      <Title>Ups, to mi wygląda na 404...</Title>

      <HomeFooterContainer />
    </>
  );
};

export default NotFound;
