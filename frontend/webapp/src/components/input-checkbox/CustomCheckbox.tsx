import { FC } from 'react';
import { Box } from './style';
import CheckIcon from '@material-ui/icons/Check';

type CheckboxPRops = {
  id: string;
  onClick?: (id?: string) => void;
  checked: boolean;
  disabled?: boolean;
};

export const CustomCheckbox: FC<CheckboxPRops> = ({ id, onClick, checked, disabled }) => {
  return (
    <Box
      id={id}
      checked={checked}
      onClick={() => {
        if ((disabled !== undefined && disabled) || onClick === undefined) {
          return null;
        }

        onClick(id);
      }}
    >
      <CheckIcon className="ico" />
    </Box>
  );
};
