import { FunctionComponent } from 'react';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

import { Button } from './styles';

type Props = {
  buttonText?: string;
  onSuccess?: (response: GoogleLoginResponse | GoogleLoginResponseOffline) => void;
  onFailure?: (error: any) => void;
};

export const GoogleLoginButton: FunctionComponent<Props> = ({ buttonText, onSuccess, onFailure }) => (
  <Button
    clientId="60927032667-n1p23ni28cu5ub543u751ggr0crmcnle.apps.googleusercontent.com"
    buttonText={buttonText}
    onSuccess={onSuccess}
    onFailure={onFailure}
    cookiePolicy={'single_host_origin'}
  />
);
