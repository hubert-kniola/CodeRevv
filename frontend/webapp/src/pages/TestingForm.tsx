import { FC, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { LoadingOverlay, MessageOverlay, scrollIntoMessageOverlay } from 'components';
import { apiAxios } from 'utility';
import { Test, testFromResponse, testsFromResponse } from 'const';
import { TestFillForm } from 'containers';

/* Randomize array with deepcopy using Durstenfeld shuffle algorithm */
const shuffleArray = (array: any[]): any[] => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return JSON.parse(JSON.stringify(array));
};

const shuffleTest = (t: Test): Test => {
  const questions = t.questions.map((q) => ({
    ...q,
    answers: shuffleArray(q.answers),
  }));

  return { ...t, questions: shuffleArray(questions) };
};

type RouteParams = {
  id: string;
};

const TestingForm: FC = () => {
  const { id } = useParams<RouteParams>();

  const [test, setTest] = useState<Test | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentTimeout, setCurrentTimeout] = useState<NodeJS.Timeout | null>(null);

  const errorRef = useRef<HTMLDivElement>(null);

  const onSubmit = async () => {
    clearTimeout(currentTimeout!);
    setCurrentTimeout((_) => null);

    console.log(test);
  };

  const onPartialSubmit = async () => {};

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const { data } = await apiAxios.get('/test/list');

        const rawTest = testsFromResponse(data)[5];
        console.log(rawTest);

        //const { data } = await apiAxios.get(`/test/${id}`);
        //const rawTest = testFromResponse(data);

        setTest(shuffleTest(rawTest));
        setLoading(false);

        if (currentTimeout == null) {
          setCurrentTimeout((_) => setTimeout(() => onPartialSubmit(), 10000));
        }
      } catch (err) {
        if (err.response) {
          if (err.response.status_code === 403) {
            setError('Nie masz dostępu do tego testu.');
          } else {
            setError('Nie udało się pobrać tego testu.\nSpróbuj ponownie po odświeżeniu strony.');
          }
        } else {
          setError('Nasz serwer nie odpowiada.\nJeśli masz dostęp do internetu oznacza to że mamy awarię :(');
        }

        scrollIntoMessageOverlay(errorRef);
      }

      setLoading(false);
    };

    fetchTest();
  }, []);

  return (
    <>
      <MessageOverlay ref={errorRef} active={error != null} title="Mamy problem..." text={error!} noLogo />

      <LoadingOverlay active={loading} text="Pobieramy test..." logo>
        {test != null && <TestFillForm test={test} setTest={setTest} onSubmit={onSubmit} />}
      </LoadingOverlay>
    </>
  );
};

export default TestingForm;
