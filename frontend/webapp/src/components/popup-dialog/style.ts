import styled from 'styled-components';

export const BackdropElement = styled.div`
  display: -webkit-flexbox;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 99997;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const Overlay = styled.div`
  max-width: 800px;
  background-color: ${({ theme }) => theme.colors.lighterBackground};
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0px 8px 14px 4px #000000;
  z-index: 99999;

  hr {
    margin-top: 15px;
    margin-bottom: 15px;
    width: 50%;
  }
`;

export const MainButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 10px 10px;
  color: ${({ theme }) => theme.colors.text};
  border-radius: 15px;
  font-size: 1rem;
  margin: 1rem 1rem 0 1rem;
  text-align: center;
  box-shadow: 0px 8px 14px 4px #000000;
  border: 0px solid transparent;
  outline: none;
  cursor: pointer;
  min-width: 10rem;

  display: inline-block;

  &:hover {
    transition: 0.2s ease-in-out;
    background: ${({ theme }) => theme.colors.text};
    color: ${({ theme }) => theme.colors.background};
  }
`;

export const MinorButton = styled.button`
  background-color: ${({ theme }) => theme.colors.setting};
  padding: 10px 10px;
  color: ${({ theme }) => theme.colors.text};
  border-radius: 15px;
  font-size: 1rem;
  margin: 1rem 1rem 0 1rem;
  text-align: center;
  box-shadow: 0px 8px 14px 4px #000000;
  border: 0px solid transparent;
  outline: none;
  cursor: pointer;
  min-width: 10rem;

  display: inline-block;

  &:hover {
    transition: all 0.5s ease-in-out;
    background: ${({ theme }) => theme.colors.primary};
  }
`;

export const Title = styled.h1`
  font-size: 50px;
  margin-top: 10px;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  white-space: pre-wrap;

  @media (max-width: 600px) {
    font-size: 35px;
  }
`;

export const Body = styled.p`
  white-space: pre-wrap;
  font-size: 20px;
  margin-top: 30px;
  color: ${({ theme }) => theme.colors.text};
  white-space: pre-wrap;

  @media (max-width: 600px) {
    font-size: 16px;
    line-height: 22px;
  }
`;


