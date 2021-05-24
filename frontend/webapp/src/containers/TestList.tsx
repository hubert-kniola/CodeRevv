import { TestView } from 'components';
import { FC, useState } from 'react';
import { apiAxios } from 'utility';

export type Test = {
  testName: string;
  questions: string[];
  createdAt: Date;
};

export const TestList: FC = () => {
  const [tests, setTests] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await apiAxios.get('/tests/');

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {tests.map(({ testName, createdAt, questions }, i) => {
        <></>;
      })}
    </>
  );
};
