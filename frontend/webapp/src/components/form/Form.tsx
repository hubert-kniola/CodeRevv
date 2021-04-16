import { FormEventHandler, forwardRef, FunctionComponent, ReactNode } from 'react';
import { Button, Container, Error, FormContainer, FormGroupContainer, FormInner, Input } from './styles';

type Props = {
  onSubmit?: FormEventHandler<HTMLFormElement>;
};

export const Form: FunctionComponent<Props> = ({ onSubmit, children }) => (
  <Container>
    <FormContainer onSubmit={onSubmit}>
      <FormInner>{children}</FormInner>
    </FormContainer>
  </Container>
);

export const FormGroup: FunctionComponent = ({ children, ...restProps }) => (
  <FormGroupContainer {...restProps}>{children}</FormGroupContainer>
);
export const FormButton: FunctionComponent = ({ children, ...restProps }) => <Button {...restProps}>{children}</Button>;

type BaseProps = {
  children: ReactNode;
  name: string;
  type: string;
  placeholder: string;
  onChange: (e: any) => void;
};

export const FormInputWithErrors = forwardRef<HTMLInputElement, BaseProps>(({ children, ...restProps }, ref) => (
  <>
    <Input ref={ref} {...restProps} />
    <Error {...restProps}>{children}</Error>
  </>
));
