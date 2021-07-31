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
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
//#endregion

//#region FIELDS
export const INSERT_PHOTO_ICO = <InsertPhotoIcon/>;
export const INLINE_STYLE_TYPE =  "inline-style";
export const BLOCK_STYLE_TYPE = "block-style";
export const ADDITIONAL_FUNCTION_STYLE = "additional-function";
//#endregion

export type SyntheticKeyboardEvent = React.KeyboardEvent<{}>;

export type Style = {
  label: string;
  style: string;
  icon?: ReactElement;
  type: string;
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
export const TOOLBAR_STYLE: Style[] = [
  //INLINE
  { label: 'Bold', style: 'BOLD', icon: <FormatBoldIcon />, type: INLINE_STYLE_TYPE},
  { label: 'Italic', style: 'ITALIC', icon: <FormatItalicIcon />, type: INLINE_STYLE_TYPE },
  { label: 'Underline', style: 'UNDERLINE', icon: <FormatUnderlinedIcon />, type: INLINE_STYLE_TYPE },
  //BLOCK
  { label: 'UL', style: 'unordered-list-item', icon: <FormatListBulletedIcon />, type: BLOCK_STYLE_TYPE },
  { label: 'OL', style: 'ordered-list-item', icon: <FormatListNumberedIcon />, type: BLOCK_STYLE_TYPE },
  { label: 'Code Block', style: 'code-block', icon: <CodeIcon />, type: BLOCK_STYLE_TYPE },
];

export const ADDITIONAL_FUNCTIONS: Additional[] = [
  { label: 'Undo', onClick: Undo, icon: <UndoIcon />, style: ADDITIONAL_FUNCTION_STYLE, active: HasUndoStack },
  { label: 'Redo', onClick: Redo, icon: <RedoIcon />, style: ADDITIONAL_FUNCTION_STYLE, active: HasRedoStack },
];
//#endregion


//#endregion
