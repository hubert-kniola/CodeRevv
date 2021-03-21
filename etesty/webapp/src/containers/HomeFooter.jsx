import { Footer } from '../components';

const HomeFooter = () => (
  <Footer>
    <Footer.Title>Miejsce na stopkę.</Footer.Title>
    <Footer.Break />
    <Footer.Row>
      <Footer.Column>
        <Footer.Link href="#">FAQ</Footer.Link>
        <Footer.Link href="#">Inwestorzy</Footer.Link>
        <Footer.Link href="#">O organizacji</Footer.Link>
      </Footer.Column>

      <Footer.Column>
        <Footer.Link href="#">Praca</Footer.Link>
        <Footer.Link href="#">Warunki korzystania z usługi</Footer.Link>
      </Footer.Column>

      <Footer.Column>
        <Footer.Link href="#">Konto</Footer.Link>
        <Footer.Link href="#">Subskrypcja</Footer.Link>
        <Footer.Link href="#">Prywatność</Footer.Link>
      </Footer.Column>

      <Footer.Column>
        <Footer.Link href="#">Informacje prawne</Footer.Link>
        <Footer.Link href="#">Przechowywanie ciasteczek</Footer.Link>
      </Footer.Column>
    </Footer.Row>
  </Footer>
);

export default HomeFooter;
