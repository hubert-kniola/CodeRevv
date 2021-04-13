import { ReactElement } from 'react';
import LaptopChromebookIcon from '@material-ui/icons/LaptopChromebook';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ScoreIcon from '@material-ui/icons/Score';
import SettingsIcon from '@material-ui/icons/Settings';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import AssignmentIcon from '@material-ui/icons/Assignment';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import GroupIcon from '@material-ui/icons/Group';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import EditIcon from '@material-ui/icons/Edit';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import ErrorIcon from '@material-ui/icons/Error';

//https://material-ui.com/components/material-icons/#material-icons

export type SubMenu = {
  title: string;
  icon: ReactElement;
  link: string;
};

export type SidebarItem = {
  title: string;
  icon: ReactElement;
  link: string;
  subMenu: SubMenu[];
};

export const sidebarData: SidebarItem[] = [
  {
    title: 'Testy',
    icon: <LaptopChromebookIcon />,
    link: '/dashboardTest#',
    subMenu: [
      {
        title: 'Stwórz test',
        icon: <NoteAddIcon />,
        link: '/home',
      },
      {
        title: 'Moje testy',
        icon: <AssignmentIcon />,
        link: '/home',
      },
    ],
  },
  {
    title: 'Grupy',
    icon: <PeopleAltIcon />,
    link: '/dashboardTest#',
    subMenu: [
      {
        title: 'Stwórz grupę',
        icon: <GroupAddIcon />,
        link: '/home',
      },
      {
        title: 'Moje grupy',
        icon: <GroupIcon />,
        link: '/home',
      },
    ],
  },
  {
    title: 'Wyniki',
    icon: <ScoreIcon />,
    link: '/home',
    subMenu: [],
  },
  {
    title: 'Zarządzaj kontem',
    icon: <SettingsIcon />,
    link: '/home',
    subMenu: [],
  },
];

export type NavBarData = {
  id: string;
  title: string;
  icon: ReactElement;
  link: string;
};

export const userNavBarData: NavBarData[] = [
  {
    id: 'profile',
    title: 'Mój profil',
    icon: <EmojiEmotionsIcon />,
    link: '#',
  },
  {
    id: 'edit',
    title: 'Edytuj profil',
    icon: <EditIcon />,
    link: '#',
  },
  {
    id: 'sth',
    title: 'jakaś opcja',
    icon: <ErrorIcon />,
    link: '#',
  },
  {
    id: 'logout',
    title: 'Wyloguj',
    icon: <DirectionsWalkIcon />,
    link: '#',
  },
];
