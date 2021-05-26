import styled from 'styled-components';

export const Container = styled.div`
  width: 80%;
  height: 500px;
  background-color: #1f1f1f;
  margin: 1rem auto;
  padding: 0.5rem;
  position: relative;
  color: #ebebeb;

  div#header {
    background-color: #3f3f3f;
    font-weight: bold;
    color: #ebebeb;
    text-align: center;
    border-radius: 0 15px 0 0;

    :hover {
      background-color: #3f3f3f;
      border-bottom: 0;
    }
  }
`;

export const Pagin = styled.div`
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
`;

export const HeaderTool = styled.div`
  width: 100%;
  display: fixed;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  align-items: center;

  .sortFiled {
    width: 10%;
    float: left;
    margin: auot 0;
  }

  & h3 {
    margin: 0.5rem auto 0 1rem;
  }

  & p {
    margin: 0;
    font-size: 11px;
    margin-left: 1rem;
    opacity: 0.7;
  }

  & input {
    margin: auto;
    color: black;
    height: 20%;
  }

  & button {
    margin: auto;
  }
`;

export const TableFormat = styled.div<{ header?: boolean }>`
  width: 100%;
  background-color: #5f5f5f;
  margin: 0 auto;
  height: 40px;
  display: fixed;
  padding: 0.5rem;
  justify-items: space-between;
  display: inner-block;
  text-align: center;
  color: black;

  :hover {
    background-color: #4f4f4f;
    border-bottom: 2px solid #ebebeb;
  }

  input {
    width: 2%;
    height: 100%;
    margin: auto;
  }

  & div {
    marker: none;
    width: 10%;
    margin: auto;
  }

  & div#name {
    width: 35%;
    margin: auto auto auto 3%;
  }
`;
