import axios from 'axios';
import { Test } from 'const';

export const apiAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const captchaValidateHuman = async (token: string) => {
  try {
    const { data, status } = await apiAxios.post('/recaptcha/', { token });
    return status === 200 && data.success === true;
  } catch (err) {
    throw new Error('Nie mogliśmy nawiązać połączenia z Google.');
  }
};

export const promiseDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getTestResults = async (testId: string): Promise<Test> => {
  const { data } = await apiAxios.get(`/test/results/${testId}`);
  let obj = {} as Test;
  try {
    obj = JSON.parse(data);
  } catch (err) {
    obj = JSON.parse(data.join(''));
  }

  return obj;
};
