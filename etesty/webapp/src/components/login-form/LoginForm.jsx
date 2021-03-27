import { useForm } from 'react-hook-form';
import loginContent from 'static';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './style.css';

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(8, 'chuj w dupe działa'),
});

const LoginForm = () => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => console.log(data);
  return (
    <div className="App">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Zaloguje sie</h1>
        {loginContent.inputs.map((input, key) => {
          return (
            <div key={key}>
              <p>
                <label className="label">{input.label}</label>
              </p>
              <p>
                <input name={input.name} type={input.type} className="input" ref={register} />
              </p>
              <p className="message">{errors[input.name]?.message}</p>
            </div>
          );
        })}
        <button type="submit" className="btn">
          sumbit
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
