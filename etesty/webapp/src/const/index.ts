import * as yup from 'yup';

export type FormEntry = {
  label: string;
  name: string;
  type: string;
  placeholder: string;
};

export type FormData = {
  schema: yup.ObjectSchema<any>;
  inputs: FormEntry[];
};

const NameRegex = RegExp(String.raw`^[A-Z][a-z]+$`);

export const registerFormData: FormData = {
  schema: yup.object().shape({
    email: yup.string().required('Adres email jest wymagany').email('Wprowadź poprawny adres email'),
    name: yup.string().required('Imię jest wymagane').matches(NameRegex, 'Wprowadź poprawne imię'),
    surname: yup.string().required('Nazwisko jest wymagane').matches(NameRegex, 'Wprowadź poprawne nazwisko'),
    password: yup.string().required('Hasło jest wymagane').min(8, 'Minimalna długość hasła: 8 znaków'),
    password2: yup.string().oneOf([yup.ref('password'), null], 'Hasła muszą się zgadzać'),
  }),
  inputs: [
    {
      label: 'email',
      name: 'email',
      type: 'text',
      placeholder: 'Email...',
    },
    {
      label: 'imie',
      name: 'name',
      type: 'text',
      placeholder: 'Imię...',
    },
    {
      label: 'nazwisko',
      name: 'surname',
      type: 'text',
      placeholder: 'Nazwisko...',
    },
    {
      label: 'haslo',
      name: 'password',
      type: 'password',
      placeholder: 'Hasło...',
    },
    {
      label: 'haslo2',
      name: 'password2',
      type: 'password',
      placeholder: 'Powtórz hasło...',
    },
  ],
};

export type RegisterSchema = yup.InferType<typeof registerFormData.schema>;

export const loginFormData: FormData = {
  schema: yup.object().shape({
    email: yup.string().required('Adres email jest wymagany').email('Wprowadź poprawny adres email'),
    password: yup.string().required('Hasło jest wymagane'),
  }),
  inputs: [
    {
      label: 'email',
      name: 'email',
      type: 'text',
      placeholder: 'Email...',
    },
    {
      label: 'haslo',
      name: 'password',
      type: 'password',
      placeholder: 'Hasło...',
    },
  ],
};

export type LoginSchema = yup.InferType<typeof loginFormData.schema>;

export const changePasswordFormData: FormData = {
  schema: yup.object().shape({
    password: yup.string().required('Nowe hasło jest wymagane').min(8, 'Minimalna długość hasła: 8 znaków'),
    password2: yup.string().oneOf([yup.ref('password'), null], 'Hasła muszą się zgadzać'),
  }),
  inputs: [
    {
      label: 'haslo',
      name: 'password',
      type: 'password',
      placeholder: 'Nowe hasło...',
    },
    {
      label: 'haslo2',
      name: 'password2',
      type: 'password',
      placeholder: 'Powtórz hasło...',
    },
  ],
};

export type ChangePasswordSchema = yup.InferType<typeof changePasswordFormData.schema>;


export const recoverFormData: FormData = {
  schema: yup.object().shape({
    email: yup.string().required('Adres email jest wymagany').email('Wprowadź poprawny adres email'),
  }),
  inputs: [
    {
      label: 'email',
      name: 'email',
      type: 'text',
      placeholder: 'Email...',
    },
  ],
};

export type RecoverSchema = yup.InferType<typeof recoverFormData.schema>;
