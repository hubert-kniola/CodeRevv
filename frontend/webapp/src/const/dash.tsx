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

import { IDashContext } from 'context';

//https://material-ui.com/components/material-icons/#material-icons

export type SubMenu = {
  title: string;
  icon: ReactElement;
  link: string;
  action: (c: IDashContext) => void;
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
    link: '#',
    subMenu: [
      {
        title: 'Stwórz test',
        icon: <NoteAddIcon />,
        link: '/create/test',
        action: ({ setMode }) => setMode('newtest'),
      },
      {
        title: 'Moje testy',
        icon: <AssignmentIcon />,
        link: '#',
        action: ({ setMode }) => setMode('mytests'),
      },
    ],
  },
  {
    title: 'Grupy',
    icon: <PeopleAltIcon />,
    link: '#',
    subMenu: [
      {
        title: 'Stwórz grupę',
        icon: <GroupAddIcon />,
        link: '#',
        action: (_) => {},
      },
      {
        title: 'Moje grupy',
        icon: <GroupIcon />,
        link: '#',
        action: (_) => {},
      },
    ],
  },
  {
    title: 'Wyniki',
    icon: <ScoreIcon />,
    link: '#',
    subMenu: [],
  },
  {
    title: 'Zarządzaj kontem',
    icon: <SettingsIcon />,
    link: '#',
    subMenu: [],
  },
];

export type NavBarData = {
  id: string;
  title: string;
  icon: ReactElement;
  link: string;
  action: (c: IDashContext) => void;
};

export const userNavBarData: NavBarData[] = [
  {
    id: 'profile',
    title: 'Mój profil',
    icon: <EmojiEmotionsIcon />,
    link: '#',
    action: (_) => {},
  },
  {
    id: 'edit',
    title: 'Edytuj profil',
    icon: <EditIcon />,
    link: '#',
    action: (_) => {},
  },
  {
    id: 'sth',
    title: 'jakaś opcja',
    icon: <ErrorIcon />,
    link: '#',
    action: (_) => {},
  },
  {
    id: 'logout',
    title: 'Wyloguj',
    icon: <DirectionsWalkIcon />,
    link: '#',
    action: (_) => {},
  },
];
