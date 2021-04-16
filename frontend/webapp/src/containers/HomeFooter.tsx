import { FunctionComponent } from 'react';

import { Footer, FooterBreak, FooterColumn, FooterLink, FooterRow, FooterTitle } from 'components';

export const HomeFooter: FunctionComponent = () => (
  <Footer>
    <FooterTitle>Miejsce na stopkę.</FooterTitle>
    <FooterBreak />
    <FooterRow>
      <FooterColumn>
        <FooterLink href="#">FAQ</FooterLink>
        <FooterLink href="#">Inwestorzy</FooterLink>
        <FooterLink href="#">O organizacji</FooterLink>
      </FooterColumn>

      <FooterColumn>
        <FooterLink href="#">Praca</FooterLink>
        <FooterLink href="#">Warunki korzystania z usługi</FooterLink>
      </FooterColumn>

      <FooterColumn>
        <FooterLink href="#">Konto</FooterLink>
        <FooterLink href="#">Subskrypcja</FooterLink>
        <FooterLink href="#">Prywatność</FooterLink>
      </FooterColumn>

      <FooterColumn>
        <FooterLink href="#">Informacje prawne</FooterLink>
        <FooterLink href="#">Przechowywanie ciasteczek</FooterLink>
      </FooterColumn>
    </FooterRow>
  </Footer>
);
