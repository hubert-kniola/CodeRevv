import { Button } from './styles';

const GoogleLoginButton = ({ buttonText, onSuccess, onFailure }) => (
  <Button
    clientId="60927032667-n1p23ni28cu5ub543u751ggr0crmcnle.apps.googleusercontent.com"
    buttonText={buttonText}
    onSuccess={onSuccess}
    onFailure={onFailure}
    cookiePolicy={'single_host_origin'}
  />
);

export default GoogleLoginButton;
