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
    const { data, status } = await apiAxios.post('/recaptcha/', { token });
    return status === 200 && data.success === true;
  } catch (err) {
    throw new Error('Nie mogliśmy nawiązać połączenia z Google.');
  }
};
