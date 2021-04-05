import { FormEvent, forwardRef } from 'react';
import { SubmitHandler } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';

import { AutoForm } from 'containers';
import { ReCaptcha, Title } from 'components';
import { changePasswordFormData, recoverFormData } from 'const';

type BaseProps = {
  hasId: boolean;
  error: boolean;
  onPasswordSubmit: SubmitHandler<FormEvent<HTMLFormElement>>;
  onEmailSubmit: SubmitHandler<FormEvent<HTMLFormElement>>;
};

export const Recover = forwardRef<ReCAPTCHA, BaseProps>(({ hasId, onPasswordSubmit, onEmailSubmit, error }, ref) => {
  const renderConditionally = () => {
    if (error) {
      return (
        <Title>
          Operacja zmiany hasła została odrzucona. <br /> Spróbuj ponownie.
        </Title>
      );
    } else if (hasId) {
      return (
        <>
          <AutoForm
            headerText="Wprowadź nowe hasło do konta"
            formData={changePasswordFormData}
            onSubmit={onPasswordSubmit}
            buttonText="Zmień hasło"
          />
          <ReCaptcha ref={ref} />
        </>
      );
    } else {
      return (
        <>
          <AutoForm
            headerText="Wprowadź adres e-mail przypisany do konta aby zresetować hasło"
            formData={recoverFormData}
            onSubmit={onEmailSubmit}
            buttonText="Zresetuj hasło"
          />
          <ReCaptcha ref={ref} />
        </>
      );
    }
  };

  return renderConditionally();
});
