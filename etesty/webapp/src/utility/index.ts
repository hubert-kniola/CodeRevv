import axios from 'axios';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

export const apiAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const responseGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
  console.log(response);
};

export const captchaValidateHuman = async (token: string) => {
  try {
    const response = await apiAxios.post('/recaptcha/', { token });
    console.log({ recaptcha_response: response });
    const { data } = response;

    return data.status === true;
  } catch (err) {
    throw new Error('Nie mogliśmy nawiązać połączenia z Google.');
  }
};
