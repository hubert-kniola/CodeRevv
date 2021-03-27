import styled from 'styled-components';

export const Container = styled.div`
   margin-top:10vh;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
`

export const Form = styled.form`
   display: block;
   position: relative;
   border: 4px solid #FE7920;

  @media (max-width: 1000px) {
    margin: 0 30px;
  }


`;

export const FormInner= styled.div`
   position: relative;
   display: block;
  
   padding: 30px;
   z-index: 2;
   text-align: center;

   h2 {
      color: #EBEBEB;
      font-size: 28px;
      font-weight: 600;
      margin-bottom: 30px;
   }

   hr{
       margin-bottom: 30px;
       color: #474847;
       width: 100%;
   }

`;

export const FormGroup = styled.div`
   display: block;
   width: 300px;
   margin-bottom: 15px;
`

export const Input = styled.input`
   width: 100%;
   padding: 10px 15px;
   background-color: #f8f8f8;
   border-radius: 20px;
   transition: 0.4s;

`

export const Button = styled.input`
   display: block;
   width: 100%;
   padding: 10px 15px;
   border: 0px solid transparent;
   border-radius: 20px;;
   text-align: center;
   background-color:  #FE7920;
   color: #f8f8f8;
   font-size: 20px;
   cursor: pointer;
`;

export const Error = styled.h3`
   margin-top: -1px;
   margin-left: 20px;
   font-size: 13px;
   color:red;
   text-align: left;
`



