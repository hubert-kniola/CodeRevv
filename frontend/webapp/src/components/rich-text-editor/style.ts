import styled from 'styled-components'

export const Wrapper = styled.div`
    width: 50%;
    height: 400px;
    background-color: silver;
    margin: 1rem auto;
    padding: 0.5rem;
`

export const Container = styled.div`
    width: 100%;
    margin: 0;
    height: 100%;
    background-color: white;
`

export const Toolbar = styled.div`
    width: 100%;
    margin: 0;
    height: 50px;
    background-color: red;
    display: fixed;
    justify-content: space-between;


`

export const Button = styled.div`
    width: 10%;
    height: 100%;
    background-color: pink;
    margin: auto;

    &.active{
        background-color: green;
    }
`