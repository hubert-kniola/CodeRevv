import { useSelector } from 'react-redux';

import { getAll } from '../store/slices/faq';
import { Accordion } from '../components';

const HomeFaq = () => {
  const faq = useSelector(getAll);

  console.log(faq);
  return (
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
  );
};

export default HomeFaq;
