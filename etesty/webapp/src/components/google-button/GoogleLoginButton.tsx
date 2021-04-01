import { FunctionComponent } from 'react';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

import { Button } from './styles';

type Props = {
  onSuccess?: (response: GoogleLoginResponse | GoogleLoginResponseOffline) => void;
  onFailure?: (error: any) => void;
};

export const GoogleLoginButton: FunctionComponent<Props> = ({ onSuccess, onFailure }) => (
  <Button
    clientId="60927032667-n1p23ni28cu5ub543u751ggr0crmcnle.apps.googleusercontent.com"
    buttonText="Zaloguj się przez konto Google"
    onSuccess={onSuccess}
    onFailure={onFailure}
    cookiePolicy={'single_host_origin'}
  />
);
