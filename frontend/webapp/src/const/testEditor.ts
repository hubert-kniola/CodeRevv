import * as yup from 'yup';

export const testEditorSchema = yup.object().shape({
  testName: yup.string().required('Musisz wprowadzić nazwę testu').min(10, 'Nazwa musi mieć conajmniej 10 znaków'),
});
