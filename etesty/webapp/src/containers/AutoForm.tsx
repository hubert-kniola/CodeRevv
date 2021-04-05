import { FormEvent, FunctionComponent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { GoogleLoginButton, Form, FormButton, FormInputWithErrors, FormGroup } from 'components';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

import type { FormData } from 'const';

type Props = {
  onSubmit: SubmitHandler<FormEvent<HTMLFormElement>>;
  onSuccessGoogle?: (response: GoogleLoginResponse | GoogleLoginResponseOffline) => void;
  onFailureGoogle?: (error: any) => void;
  formData: FormData;
  headerText: string;
  buttonText: string;
};

export const AutoForm: FunctionComponent<Props> = ({
  headerText,
  buttonText,
  formData,
  onSubmit,
  onSuccessGoogle,
  onFailureGoogle,
}) => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(formData.schema),
  });

  const fields = formData.inputs.reduce(({ ...prev }, { name }) => ({ ...prev, [name]: '' }), {});
  const [state, setState] = useState(fields);

  const changeValue = (name: string, targetValue: string): void => setState({ ...state, [name]: targetValue });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h2>{headerText}</h2>

      <hr />

      {formData.inputs.map((input, key) => (
        <FormGroup key={key}>
          <FormInputWithErrors
            name={input.name}
            type={input.type}
            placeholder={input.placeholder}
            ref={register}
            onChange={(e) => changeValue(input.name, e.target.value)}
          >
            {errors[input.name]?.message}
          </FormInputWithErrors>
        </FormGroup>
      ))}

      <FormButton>{buttonText}</FormButton>
      {onSuccessGoogle != null && onFailureGoogle != null ? (
        <GoogleLoginButton onSuccess={onSuccessGoogle} onFailure={onFailureGoogle} />
      ) : null}
    </Form>
  );
};
