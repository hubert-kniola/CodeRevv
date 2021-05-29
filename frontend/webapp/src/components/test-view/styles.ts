import styled from 'styled-components';

export const Container = styled.div`
  width: 80%;
  background-color: #1f1f1f;
  margin: 1rem auto;
  padding: 0.5rem;
  position: relative;
  color: #ebebeb;

  div#header {
    font-weight: bold;
    color: #ebebeb;
    text-align: center;
    border-radius: 0 15px 0 0;
    border-bottom: 1px solid #ebebeb;

    :hover{
      background-color: #1f1f1f;
    }
  }
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
    color: #ebebeb;
    height: 20%;
  }

  & button {
    margin: auto;
  }
`;

export const TableFormat = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 40px;
  display: fixed;
  padding: 0.5rem;
  justify-items: space-between;
  display: inner-block;
  text-align: center;
  transition: all 0.15s ease-in-out; 

  :hover {
    background-color: #5f5f5f;
    color: #ebebeb
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

export const ScrollDiv = styled.div`
  scrollbar-width: 0;
  max-height: 200px;
  overflow: auto;
  scroll-behavior: smooth;
  color: #ebebeb90;

  ::-webkit-scrollbar {
    width: 3px;
  }

  ::-webkit-scrollbar-track{
    background-color: #1f1f1f;
  }

  ::-webkit-scrollbar-thumb{
    background-image: linear-gradient(#1f1f1f, #ebebeb50, #FFA50090 ,#ebebeb50, #1f1f1f);

  }
`

export const TestDetails = styled.div`
  width: 100%;
  background-color: #5f5f5f;
  margin: 0 0 0 auto;
`;

export const TestName_detail = styled.label`
  display: block;
  font-size: 28px;
  margin: 2rem auto;
  width: 100%;
  text-align: center;
  border-radius: 15px;
  box-shadow: 0px 7px 15px 3px #000000;
  padding: 0.5rem;
`;
export const Container_details = styled.div`
  display: fixed;
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem;
`;

export const Menu_details = styled.div`
  width: 20%;
  box-shadow: 0px 7px 15px 3px #000000;
  border-radius: 15px;

  button {
    background-color: #5f5f5f;
    font-size: 16px;
    width: 100%;
    height: 35px;
    border: 0px;
    color: #ebebeb;
  }

  button#first {
    border-radius: 15px 15px 0 0;
  }

  button#last {
    border-radius: 0 0 15px 15px;
  }
`;

export const Setting_details = styled.div`
  background-color: blue;
  width: 75%;
`;
