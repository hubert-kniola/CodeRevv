import { useContext } from 'react';

import { Container, CheckBox, Label } from './styles';
import { ThemeContext } from 'context';

const ThemeSwitch = () => {
    const themeContext = useContext(ThemeContext);

    return (
        <Container>
            <CheckBox checked={themeContext.theme.name === 'light'} onChange={() => { }} onClick={themeContext.switchTheme} />
            <Label />
        </Container>
    )
};

export default ThemeSwitch;