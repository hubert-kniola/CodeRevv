import { FC } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { EditorForm } from 'components';

const schema = yup.object().shape({
  name: yup.string().required('Musisz wprowadzić nazwę testu').min(10, 'Nazwa musi mieć conajmniej 10 znaków'),
});

export const TestEditor: FC = () => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  return <EditorForm></EditorForm>;
};
