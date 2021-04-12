import LaptopChromebookIcon from '@material-ui/icons/LaptopChromebook';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ScoreIcon from '@material-ui/icons/Score';
import SettingsIcon from '@material-ui/icons/Settings';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import AssignmentIcon from '@material-ui/icons/Assignment';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import GroupIcon from '@material-ui/icons/Group';
import { ReactElement } from 'react';


//https://material-ui.com/components/material-icons/#material-icons

export type SubMenu = {
    title: string;
    icon: ReactElement;
    link: string;
}

export type SidebarItem = {
    title: string;
    icon: ReactElement;
    link: string;
    subMenu: SubMenu[];
}

export const SidebarData: SidebarItem[] = [
    {
        title: "Testy",
        icon: <LaptopChromebookIcon />,
        link: '/home',
        subMenu: [
            {
                title: "Stwórz test",
                icon: <NoteAddIcon />,
                link: '/home',
            },
            {
                title: "Moje testy",
                icon: <AssignmentIcon />,
                link: '/home',
            },
        ]
    },
    {
        title: "Grupy",
        icon: <PeopleAltIcon />,
        link: '/home',
        subMenu:[
            {
                title: "Stwórz grupę",
                icon: <GroupAddIcon />,
                link: '/home',
            },
            {
                title: "Moje grupy",
                icon: <GroupIcon />,
                link: '/home',
            },
        ],
    },
    {
        title: "Wyniki",
        icon: <ScoreIcon />,
        link: '/home',
        subMenu:[],
    },
    {
        title: "Zarządzaj kontem",
        icon: <SettingsIcon />,
        link: '/home',
        subMenu:[],
    },
]