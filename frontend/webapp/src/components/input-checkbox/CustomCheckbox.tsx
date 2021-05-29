import { FC } from 'react';
import { Box } from './style';
import CheckIcon from '@material-ui/icons/Check';

type CheckboxPRops = {
  id: string;
  onClick: (id?: string) => void;
  checked: boolean;
};

export const CustomCheckbox: FC<CheckboxPRops> = ({ id, onClick, checked }) => {
  return (
    <Box id={id} checked={checked} onClick={() => onClick()}>
      <CheckIcon className="ico" />
    </Box>
  );
};
