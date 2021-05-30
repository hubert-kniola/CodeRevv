import { FC } from "react";
import { Wrapper } from './style'

export const CustomInput:FC = () =>{
    return(
        <Wrapper>
            <div className="input-data">
                <input type="text" required/>
                <label> Name... </label>
                <div className="underline"/>
            </div>
        </Wrapper>
    )
}