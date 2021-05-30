import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 200px;
  background-color: #fff;
  padding: 1.5rem 0.5rem 0.5rem 0.5rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  color: grey;



  & .input-data {
    height: 100%;
    width: 90%;
    position: relative;

    & .ico{
        width:10%;
        font-size: large;
        position: relative;
        right: 0;
    }

    & input {
      height: 100%;
      width: 100%;
      border: none;
      border-bottom: 2px solid silver;
      font-size: 16px;
    }

    & label {
      position: absolute;
      font-size: 19px;
      bottom: 0px;
      left: 5px;
      padding: 2px;
      pointer-events: none;
      transition: all 0.3s ease-in-out;
    }

    & input:focus{
        outline: none;
    }

    & input:focus ~ label,
    & input:valid ~ label {
      transform: translateY(-20px);
      font-size: 16px;
      color: orange;
      left: 7px;
      
    }

    & .underline {
      position: absolute;
      bottom: 0px;
      height: 2px;
      width: 100%;
    }

    & .underline:before{
        position: absolute;
        content: "";
        height: 100%;
        width: 100%;
        background-color: red;
        transform: scaleX(0);
        transition: transform 0.3s ease;
    }

    
    & input:focus ~ .underline:before,
    & input:valid ~ .underline:before {
        transform: scaleX(1);

    }

  }
`;
