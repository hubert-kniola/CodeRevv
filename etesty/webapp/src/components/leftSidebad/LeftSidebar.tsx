import { FunctionComponent } from 'react'
import { Board, LeftBar, MainBoard } from './styles'

export const LeftSidebar: FunctionComponent = () =>(
    <Board>
        <LeftBar>leftbar</LeftBar>
        <MainBoard>MainBoard</MainBoard>
    </Board>
);