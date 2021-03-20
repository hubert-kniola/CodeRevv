import { Title, Accordion } from '../components';
import { HomeFooterContainer, HomeNavContainer } from '../containers';

const faq = [
  {
    key: 1,
    title: 'Do jakiej grupy docelowej skierowana jest platforma?',
    body:
      'Do każdej! Platforma umożliwi tworzenie testów zawierających pytania otwarte i zamknięte, tym samym będzie można ją wykorzystać w każdej sytuacji.',
  },
  {
    key: 2,
    title: 'Kiedy platforma zostanie ukończona?',
    body:
      'Termin oddania pracy inżynierskiej to koniec stycznia. Do tego czasu chcemy zaimplementować większość funkcjonalności.',
  },
  {
    key: 3,
    title: 'Jaki będzie koszt korzystania z platformy?',
    body:
      'Na początku nie przewidujemy opłat za korzystanie z platformy. Będziemy wdzięczni za każdy feedback pozwalający nam na ulepszenia.',
  },
];

const Home = () => {
  return (
    <>
      <HomeNavContainer />

      <Title>Tu powstaje platforma testów online.</Title>

      <Accordion>
        <Accordion.Title>Masz jakieś pytania?</Accordion.Title>

        <Accordion.Frame>
          {faq.map((e) => (
            <Accordion.Item key={e.key}>
              <Accordion.Header>{e.title}</Accordion.Header>
              <Accordion.Body>{e.body}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion.Frame>
      </Accordion>

      <HomeFooterContainer />
    </>
  );
};

export default Home;
