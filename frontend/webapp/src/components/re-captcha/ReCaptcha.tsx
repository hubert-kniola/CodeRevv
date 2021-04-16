import { forwardRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export const ReCaptcha = forwardRef<ReCAPTCHA>((_, ref) => {
  const siteKey = process.env.REACT_APP_RECAPTCHA_SITEKEY;

  if (siteKey == null) {
    throw new Error('ReCAPTCHA siteKey could not be read');
  }

  return <ReCAPTCHA sitekey={siteKey} size="invisible" ref={ref} theme="light" />;
});
