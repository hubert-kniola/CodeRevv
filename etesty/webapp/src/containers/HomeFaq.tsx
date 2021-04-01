import { FunctionComponent } from 'react';
import { nanoid } from 'nanoid';

import { Accordion, AccordionBody, AccordionFrame, AccordionHeader, AccordionItem, AccordionTitle } from 'components';

const faqs = [
  {
    key: nanoid(),
    title: 'Do jakiej grupy docelowej skierowana jest platforma?',
    body:
      'Do każdej! Platforma umożliwi tworzenie testów zawierających pytania otwarte i zamknięte, tym samym będzie można ją wykorzystać w każdej sytuacji.',
  },
  {
    key: nanoid(),
    title: 'Kiedy platforma zostanie ukończona?',
    body:
      'Termin oddania pracy inżynierskiej to koniec stycznia. Do tego czasu chcemy zaimplementować większość funkcjonalności.',
  },
  {
    key: nanoid(),
    title: 'Jaki będzie koszt korzystania z platformy?',
    body:
      'Na początku nie przewidujemy opłat za korzystanie z platformy. Będziemy wdzięczni za każdy feedback pozwalający nam na ulepszenia.',
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
