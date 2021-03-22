import { Title } from 'components';
import { HomeFooter, HomeNav, HomeFaq } from 'containers';

const Home = () => {
  return (
    <>
      <HomeNav />

      <Title>Tu powstaje platforma testów online.</Title>

      <HomeFaq />

      <HomeFooter />
    </>
  );
};

export default Home;
