import { FunctionComponent } from 'react';
import { Container, Text } from './styles';

export const Title: FunctionComponent = ({ children }) => (
  <Container>
    <Text>{children}</Text>
  </Container>
);
