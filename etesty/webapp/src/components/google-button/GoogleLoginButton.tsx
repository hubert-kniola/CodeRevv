import { FunctionComponent } from 'react';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

import { Button } from './styles';

type Props = {
  onSuccess?: (response: GoogleLoginResponse | GoogleLoginResponseOffline) => void;
  onFailure?: (error: any) => void;
};

export const GoogleLoginButton: FunctionComponent<Props> = ({ onSuccess, onFailure }) => {
  const clientId = process.env.REACT_APP_GLOGIN_CLIENT_ID;

  if (clientId == null) {
    throw new Error('Google ClientId could not be read');
  }

  return (
    <Button
      clientId={clientId}
      buttonText="Zaloguj się przez konto Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
    />
  );
};
