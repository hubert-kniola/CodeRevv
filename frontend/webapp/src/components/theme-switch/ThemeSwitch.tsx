import { useContext, FunctionComponent } from 'react';

import { Container, CheckBox, Label } from './styles';
import { ThemeContext } from 'context';

export const ThemeSwitch: FunctionComponent = () => {
  const { theme, switchTheme } = useContext(ThemeContext);

  return (
    <Container>
      <CheckBox disabled={true} checked={theme.name === 'light'} onChange={() => {}} onClick={switchTheme} />
      <Label />
    </Container>
  );
};
