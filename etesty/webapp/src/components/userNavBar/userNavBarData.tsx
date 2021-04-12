import { ReactElement } from "react"
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import EditIcon from '@material-ui/icons/Edit';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import ErrorIcon from '@material-ui/icons/Error';

export type Data = {
    title: string;
    icon: ReactElement;
    link: string;
}

export const userNavBarData: Data[]  = [
    {
        title: "Mój profil",
        icon: <EmojiEmotionsIcon/>,
        link: '#'
    },
    {
        title: "Edytuj profil",
        icon: <EditIcon/>,
        link: '#'
    },
    {
        title: "jakaś opcja",
        icon: <ErrorIcon/>,
        link: '#'
    },
    {
        title: "Wyloguj",
        icon: <DirectionsWalkIcon/>,
        link: '#'
    },
]

