import { forwardRef } from 'react';
import { Button, Container, Error, FormContainer, FormGroup, FormInner, Input } from './style.js';

const Form = ({ onSubmit, children }) => (
  <Container>
    <FormContainer onSubmit={onSubmit}>
      <FormInner>{children}</FormInner>
    </FormContainer>
  </Container>
);

export default Form;

Form.Group = ({ children, ...restProps }) => <FormGroup {...restProps}>{children}</FormGroup>;
Form.Button = ({ children, ...restProps }) => <Button {...restProps}>{children}</Button>;
Form.InputWithErrors = forwardRef(({ children, ...restProps }, ref) => (
  <>
    <Input ref={ref} {...restProps} />
    <Error {...restProps}>{children}</Error>
  </>
));
