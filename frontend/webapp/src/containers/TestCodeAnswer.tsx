import { CodeCell } from 'components';
import { FC, useRef, useState, useContext } from 'react';

export const TestCodeAnswer: FC = () => {
  return (
    <CodeCell loadingText="Uruchamiamy twój kod...">
    </CodeCell>
  );
};
