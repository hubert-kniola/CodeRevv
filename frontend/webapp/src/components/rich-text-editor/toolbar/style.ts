import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  margin: 0;
  height: 50px;
  background-color: ${({theme}) => theme.colors.background};
  display: fixed;
  padding: 0.5rem;
  justify-content: center;
  border-radius: 15px 15px 0px 0px;
  border: 2px solid ${({ theme }) => theme.colors.lighterBackground};
`;


export const Button = styled.div`
  color: #999;
  cursor: pointer;
  margin-right: 16px;
  display: inline-block;
  background: red;
  justify-items: center;
  

  &.active {
    color: ${({theme}) => theme.colors.primary};
  }
`;