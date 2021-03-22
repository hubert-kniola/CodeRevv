import { useDispatch, useSelector } from 'react-redux';

import { Container, CheckBox, Label } from './styles';
import themeSlice, { getName } from 'store/slices/theme';

const ThemeSwitch = () => {
    const dispatch = useDispatch();
    const themeName = useSelector(getName);

    return (
        <Container>
            <CheckBox checked={themeName === 'light'} onClick={() => dispatch(themeSlice.actions.switch())} />
            <Label />
        </Container>
    )
};

export default ThemeSwitch;