import { FC } from 'react';
import { Conteiner } from './style';

type CheckboxPRops = {
  onClick: (id?: string) => void;
  checked: boolean;
};

export const CustomCheckbox: FC<CheckboxPRops> = ({ onClick, checked }) => {
  return (
    <Conteiner>
      <input type="checkbox" id="check" onClick={() => onClick()}  checked={checked} hidden/>
      <label htmlFor="check" className="checkmark"> check</ label>
    </Conteiner>
  );
};
