import styled from 'styled-components'


export const Conteiner = styled.div` //checkbox wrapper

    .checkmark{
        display: block;
        width: 20px;
        height: 20px;
        background-color: #ddd;
        border-radius: 1px;
        transition: background-color 0.4s;
    }

    #check:checked ~ .checkmark{
        background-color: orange;
    }

    .checkmark::after{
        content: "";
        width: 7px;
        height: 15px;
        border-right: 2px solid #fff;
        border-bottom: 2px solid #fff;
        transform: translate(-50%, -0%) rotate(40deg) scale(2);
        opacity: 0;
        transition: all 0.4s;
    }   

    #check:checked ~ .checkmark::after{
        opacity: 1;
        transform: translate(-50%, -0%) rotate(40deg) scale(1);
    }

`
