import { FunctionComponent } from 'react';
import { Container, Row, Column, Link, Title, Text, Break, Background, FooterPad } from './styles';

export const Footer: FunctionComponent = ({ children, ...restProps }) => (
  <>
    <FooterPad />
    <Background>
      <Container {...restProps}>{children}</Container>
    </Background>
  </>
);

export const FooterRow: FunctionComponent = ({ children, ...restProps }) => {
  return <Row {...restProps}>{children}</Row>;
};

export const FooterColumn: FunctionComponent = ({ children, ...restProps }) => {
  return <Column {...restProps}>{children}</Column>;
};

export const FooterTitle: FunctionComponent = ({ children, ...restProps }) => {
  return <Title {...restProps}>{children}</Title>;
};

export const FooterText: FunctionComponent = ({ children, ...restProps }) => {
  return <Text {...restProps}>{children}</Text>;
};

export const FooterBreak: FunctionComponent = ({ ...restProps }) => {
  return <Break {...restProps} />;
};

type LinkProps = {
  href?: string;
};

export const FooterLink: FunctionComponent<LinkProps> = ({ children, ...restProps }) => {
  return <Link {...restProps}>{children}</Link>;
};
