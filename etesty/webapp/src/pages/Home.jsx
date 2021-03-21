import { Provider } from 'react-redux';

import store from '../store';
import { Title } from '../components';
import { HomeFooter, HomeNav, HomeFaq } from '../containers';

const Home = () => (
  <Provider store={store}>
    <HomeNav />

    <Title>Tu powstaje platforma testów online.</Title>

    <HomeFaq />

    <HomeFooter />
  </Provider>
);

export default Home;
