import styled from 'styled-components';

export const Container = styled.div`
  top: 4px;
  position: relative;
`;

export const Label = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: ${({theme}) => theme.colors.setting};
  cursor: pointer;
  
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    margin: 3px;
    background: ${({theme}) => theme.colors.background};
    transition: 0.3s;
  }
`;

Label.defaultProps = { htmlFor: 'checkbox' }

export const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  width: 42px;
  height: 26px;
  border-radius: 15px;

  &:checked + ${Label} {
    background: ${({theme}) => theme.colors.setting};
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      margin-left: 19px;
      transition: 0.3s;
      background: ${({theme}) => theme.colors.background};
    }
  }
`;

CheckBox.defaultProps = { id: 'checkbox', type: 'checkbox' }
