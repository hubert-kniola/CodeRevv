import { ReactElement } from 'react';

//#region ICO
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import CodeIcon from '@material-ui/icons/Code';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';
import { EditorState } from 'draft-js';
//#endregion


export type Style = {
  label: string;
  style: string;
  icon?: ReactElement;
};

export type Additional = {
  label: string;
  onClick: (contentState: React.Dispatch<React.SetStateAction<EditorState>>) => void;
  icon?: ReactElement;
  style: string;
  active: (editorState: EditorState) => boolean;
};

//#region FUNCTION

const Undo = (setEditorState: React.Dispatch<React.SetStateAction<EditorState>>) => {
  setEditorState((state) => EditorState.undo(state));
};

const Redo = (setEditorState: React.Dispatch<React.SetStateAction<EditorState>>) => {
  setEditorState((state) => EditorState.redo(state));
};

const HasUndoStack = (editorState: EditorState) => {
  return editorState.getUndoStack().size > 0;
};

const HasRedoStack = (editorState: EditorState) => {
  return editorState.getRedoStack().size > 0;
};
//#endregion

export type ToolbarProp = {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
};

//#region TOOLBAR_OPTION
export const INLINE_STYLE: Style[] = [
  { label: 'Bold', style: 'BOLD', icon: <FormatBoldIcon /> },
  { label: 'Italic', style: 'ITALIC', icon: <FormatItalicIcon /> },
  { label: 'Underline', style: 'UNDERLINE', icon: <FormatUnderlinedIcon /> },
];

export const BLOCK_TYPES: Style[] = [
  { label: 'UL', style: 'unordered-list-item', icon: <FormatListBulletedIcon /> },
  { label: 'OL', style: 'ordered-list-item', icon: <FormatListNumberedIcon /> },
  { label: 'Code Block', style: 'code-block', icon: <CodeIcon /> },
];

export const ADDITIONAL_FUNCTIONS: Additional[] = [
  { label: 'Undo', onClick: Undo, icon: <UndoIcon />, style: 'additional-function', active: HasUndoStack },
  { label: 'Redo', onClick: Redo, icon: <RedoIcon />, style: 'additional-function', active: HasRedoStack },
];
//#endregion


//#endregion
