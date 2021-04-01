import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
`;

export const Frame = styled.div`
  margin-bottom: 40px;
`;

export const Inner = styled.div`
  display: flex;
  padding: 70px 45px;
  flex-direction: column;
  max-width: 1400px;
  margin: auto;
`;

export const Title = styled.h1`
  font-size: 50px;
  line-height: 0.9;
  margin-top: 0;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;

  @media (max-width: 600px) {
    font-size: 35px;
  }
`;

export const Item = styled.div`
  color: ${({ theme }) => theme.colors.text};
  margin: auto;
  margin-bottom: 10px;
  max-width: 1200px;
  width: 100%;

  &:first-of-type {
    margin-top: 3em;
  }
  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const Header = styled.div<{ show: boolean }>`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  margin-bottom: 1px;
  font-size: 26px;
  font-weight: normal;
  background: ${({ theme }) => theme.colors.setting};
  padding: 0.8em 1.2em 0.8em 1.2em;
  user-select: none;
  align-items: center;
  border-radius: 15px;

  img {
    margin-left: 10px;
    filter: brightness(0) invert(1);
    width: 24px;
    user-select: none;
    transition: all 0.1s ease-in-out;

    @media (max-width: 600px) {
      width: 16px;
    }

    ${({ show }) =>
      !show &&
      css`
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
      `}

    ${({ theme }) =>
      theme.name === 'light' &&
      css`
        filter: invert(0);
      `}
  }

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

export const Body = styled.div<{ show: boolean }>`
  font-size: 26px;
  font-weight: normal;
  line-height: normal;
  background: ${({ theme }) => theme.colors.setting};
  white-space: pre-wrap;
  user-select: none;
  overflow: hidden;
  border-radius: 15px;

  ${({ show }) =>
    (show &&
      css`
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.1s cubic-bezier(0.5, 0, 0.1, 1);
      `) ||
    (!show &&
      css`
        max-height: 1200px;
        transition: max-height 1s cubic-bezier(0.5, 0, 0.1, 1);
      `)}

  span {
    display: block;
    padding: 0.8em 2.2em 0.8em 1.2em;
  }

  @media (max-width: 600px) {
    font-size: 16px;
    line-height: 22px;
  }
`;
