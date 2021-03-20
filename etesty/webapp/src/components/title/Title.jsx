import { Container, Text } from './styles';

const Title = ({ children, ...restProps }) => (
  <Container {...restProps}>
    <Text>{children}</Text>
  </Container>
);

export default Title;