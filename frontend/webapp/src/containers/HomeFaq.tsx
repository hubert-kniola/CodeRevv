import { FunctionComponent } from 'react';
import { nanoid } from 'nanoid';

import { Accordion, AccordionBody, AccordionFrame, AccordionHeader, AccordionItem, AccordionTitle } from 'components';

const faqs = [
  {
    key: nanoid(),
    title: 'Do jakiej grupy docelowej skierowana jest platforma?',
    body: `Do każdej grupy mającej na celu sprawdzenie wiedzy z zakresu programowania. Platforma umożliwi tworzenie i przeprowadzanie zautomatyzowanych testów z pytaniami zamkniętymi oraz otwartymi na zasadzie kodu języka Python. Każdy użytkownik będzie mógł zarówno tworzyć testy jak i brać w nich udział.`,
  },
  {
    key: nanoid(),
    title: 'Kiedy platforma zostanie ukończona?',
    body: `Termin oddania pracy inżynierskiej to koniec stycznia. Do tego czasu chcemy zaimplementować większość funkcjonalności - obsługę testów oraz moduł wykrywania korelacji w grupach projektów. Naszym celem jest ukończenie modułu dla języka Python, jednak zastosowane rozwiązania pozwalają dość łatwo rozszerzyć funkcjonalności o kolejne języki programowania.`,
  },
  {
    key: nanoid(),
    title: 'Jaki będzie koszt korzystania z platformy?',
    body: `Na początku nie przewidujemy opłat za korzystanie z platformy. Będziemy wdzięczni za każdy feedback pozwalający nam na ulepszenia. Docelowo moduł wykrywania korelacji w kodzie ma być udostępniany na zasadzie subskrypcji, jednak na ten moment nie znamy szczegółów.`,
  },
  {
    key: nanoid(),
    title: 'Czy platforma posiada okresowe limity korzystania?',
    body: `Nie przewidujemy takowych. Mamy nadzieję, że fundusze z subskrypcji pozwolą na wystarczające zwiększenie wydajności systemu tak abyśmy nie musieli limitować żadnej z oferowanych funkcjonalności.`,
  },
];

export const HomeFaq: FunctionComponent = () => (
  <Accordion>
    <AccordionTitle>Masz jakieś pytania?</AccordionTitle>
    <AccordionFrame>
      {faqs.map((e) => (
        <AccordionItem key={e.key}>
          <AccordionHeader>{e.title}</AccordionHeader>
          <AccordionBody>{e.body}</AccordionBody>
        </AccordionItem>
      ))}
    </AccordionFrame>
  </Accordion>
);
