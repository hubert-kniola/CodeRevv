import { FC } from "react";
import { Wrapper } from './style'
import ClearIcon from '@material-ui/icons/Clear';

export const CustomInput:FC = () =>{
    return(
        <Wrapper>
            <div className="input-data">
                <input type="text" required/>
                <label> Name...  </label>
                <div className="underline"/>
                <ClearIcon className="ico"/>
               
            </div>
        </Wrapper>
    )
}