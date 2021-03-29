import { HomeNav, SignupForm, HomeFooter } from 'containers';

const Signup = ({ history }) => (
  <>
    <HomeNav />

    <SignupForm history={history} />

    <HomeFooter />
  </>
);

export default Signup;
