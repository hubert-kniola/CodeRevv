import { FC, useEffect } from 'react'
import { Popup } from './styles'

type SmallPopupProps = {
    show: boolean,
    setShow: () => void;
}

export const SmallPopup:FC<SmallPopupProps> = ({children, show, setShow}) =>{
    useEffect(()=>{
        if(show){
            if(show){
                setTimeout(()=>{
                    setShow();
                }, 2000);
            };
        }
    },[show])

    return(
        <Popup show={show}>
            {children}
        </Popup>

    )
}