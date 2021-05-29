import styled from 'styled-components'

export const Box = styled.div<{checked:boolean}>`
    width: 20px;
    height: 20px;
    background-color: ${({checked, theme}) => checked ? theme.colors.primary : theme.colors.text};
    margin: 0 auto;
    align-items: center;
    justify-content: center;
    transition: all 0.5s;
    border-radius: 2px;
    
    .ico{
        font-weight: bold;
        transition: all  0.5s;
        margin: 0;
        transform: translate(-8%, -8%) ${({checked}) => checked ? 'scale(1)' : 'scale(2.25)'};;
        opacity: ${({checked}) => checked ? '1' : '0'};
        color: #ebebeb;
    }

`
