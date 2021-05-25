import styled from 'styled-components';

export const Container = styled.div`
  width: 80%;
  height: 400px;
  background-color: red;
  margin: 1rem auto;
  padding: 0.5rem;

  div#header{
    background-color: #000080;
    font-weight: bold;
    color: #ebebeb;
  }
`;

export const HeaderTool = styled.div`
  width: 100%;
  display: fixed;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  align-items: center;

  & h3 {
    margin: 0.5rem auto 0 1rem;
  }

  & p {
    margin: 0;
    font-size: 11px;
    margin-left: 1rem;
  }

  & input {
    margin: auto;
  }

  & button {
    margin: auto;
  }
`;

export const TableFormat = styled.div`
  width: 100%;
  background-color: blue;
  margin: 0 auto;
  height: 40px;
  display: fixed;
  padding: 0.5rem;
  text-align: center;
  justify-items: space-between;
  display: inner-block;



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


export const Pagin = styled.div`
    margin: 0.5rem auto;
    float: right;
`
