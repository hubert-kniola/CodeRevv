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
//#endregion 

//#region EDITOR_PLUGINS
import { composeDecorators } from '@draft-js-plugins/editor';
import createImagePlugin from '@draft-js-plugins/image';
import createFocusPlugin from '@draft-js-plugins/focus';
import createResizeablePlugin from '@draft-js-plugins/resizeable';
import createBlockDndPlugin from '@draft-js-plugins/drag-n-drop';
import createDragNDropUploadPlugin, { readFile } from '@draft-js-plugins/drag-n-drop-upload';
import { EditorState } from 'draft-js';
//#endregion

//#region PLUGINS_CONSTRUCTOR
const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  focusPlugin.decorator,
  blockDndPlugin.decorator
);
const imagePlugin = createImagePlugin({ decorator });

const dragNDropFileUploadPlugin = createDragNDropUploadPlugin({
  handleUpload: mockUpload,
  addImage: imagePlugin.addImage,
});
//#endregion

export const plugins = [
  dragNDropFileUploadPlugin,
  blockDndPlugin,
  focusPlugin,
  resizeablePlugin,
  imagePlugin,
];

//https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/draft-js/index.d.ts
export type SyntheticKeyboardEvent = React.KeyboardEvent<{}>; 
//ukręcony mały wałek. Ale kto nie ryzykuje ten w Rawiczu nie siedzi 
//<<dla niewtajemniczonych w rawiczu jest więzienie>> 

export type Style = {
    label: string;
    style: string;
    icon?: ReactElement;
}

export type Additional = {
  label: string;
  onClick: (contentState: React.Dispatch<React.SetStateAction<EditorState>>) => void 
  icon?: ReactElement;
  style: string;
}

//#region FUNCTION

const Undo = (setEditorState: React.Dispatch<React.SetStateAction<EditorState>> ) => {
  setEditorState(state => EditorState.undo(state));
}

const Redo = (setEditorState: React.Dispatch<React.SetStateAction<EditorState>>) => {
  setEditorState(state => EditorState.redo(state));
}
//#endregion

export type ToolbarProp = {
    editorState: EditorState;
    setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
  };

//#region TOOLBAR_OPTION
export const INLINE_STYLE: Style[] =[
    { label: "Bold", style: "BOLD", icon: <FormatBoldIcon />},
    { label: "Italic", style: "ITALIC", icon: <FormatItalicIcon /> },
    { label: "Underline", style: "UNDERLINE", icon: <FormatUnderlinedIcon />},
    //{ label: "Monospace", style: "CODE", icon: <CodeIcon /> }
]

export const BLOCK_TYPES:  Style[] = [
    { label: "UL", style: "unordered-list-item", icon: <FormatListBulletedIcon/>},
    { label: "OL", style: "ordered-list-item", icon: <FormatListNumberedIcon/> },
    { label: "Code Block", style: "code-block", icon: <CodeIcon /> },
  ];

export const ADDITIONAL_FUNCTIONS: Additional[] =[
  {label: "Undo", onClick: Undo, icon: <UndoIcon/>, style: "additional-function"},
  {label: "Redo", onClick: Redo, icon: <RedoIcon/>, style: "additional-function"},
]
  //#endregion


//#region ADDITIONAL_FUNCTIONS
export default function mockUpload(data?: any, success?: any, progress?: any) {
  function doProgress(percent?: any) {
    progress(percent || 1);
    if (percent === 100) {
      // Start reading the file
      Promise.all(data.files.map(readFile)).then((files) =>
        success(files, { retainSrc: true })
      );
    } else {
      setTimeout(doProgress, 250, (percent || 0) + 10);
    }
  }

  doProgress();
}


//#endregion