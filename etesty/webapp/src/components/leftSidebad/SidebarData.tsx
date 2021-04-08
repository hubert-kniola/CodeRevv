import LaptopChromebookIcon from '@material-ui/icons/LaptopChromebook';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ScoreIcon from '@material-ui/icons/Score';
import SettingsIcon from '@material-ui/icons/Settings';
import { ReactElement } from 'react';


//https://material-ui.com/components/material-icons/#material-icons

export type SidebarItem = {
    title: string;
    icon: ReactElement;
    link: string;
}

export const SidebarData: SidebarItem[] = [
    {
        title: "Testy",
        icon: <LaptopChromebookIcon />,
        link: '/home',
    },
    {
        title: "Moje grupy",
        icon: <PeopleAltIcon />,
        link: '/home',
    },
    {
        title: "Wyniki",
        icon: <ScoreIcon />,
        link: '/home',
    },
    {
        title: "Zarządzaj kontem",
        icon: <SettingsIcon />,
        link: '/home',
    },
]