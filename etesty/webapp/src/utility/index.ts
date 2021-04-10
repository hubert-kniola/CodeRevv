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
    

  } catch (err) {

  }

  return false;
};
