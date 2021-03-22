import { useDispatch } from 'react-redux';

import { Button } from './styles';
import themeSlice from 'store/slices/theme';

const ThemeSwitch = () => {
    const dispatch = useDispatch();

    return (
        <Button onClick={() => dispatch(themeSlice.actions.switch())}>
            Motyw
        </Button>
    )
};

export default ThemeSwitch;