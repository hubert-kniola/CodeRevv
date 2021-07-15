import { ReactElement } from 'react';

//#region ICO
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import CodeIcon from '@material-ui/icons/Code';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
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

export type ToolbarProp = {
    editorState: EditorState;
    setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
  };
  
//#region TOOLBAR_OPTION
export const INLINE_STYLE: Style[] =[
    { label: "Bold", style: "BOLD", icon: <FormatBoldIcon />},
    { label: "Italic", style: "ITALIC", icon: <FormatItalicIcon /> },
    { label: "Underline", style: "UNDERLINE", icon: <FormatUnderlinedIcon />},
    { label: "Monospace", style: "CODE", icon: <CodeIcon /> }
]

export const BLOCK_TYPES:  Style[] = [
    { label: "H1", style: "header-one" },
    { label: "H2", style: "header-two" },
    { label: "H3", style: "header-three" },
    // { label: "H4", style: "header-four" },
    // { label: "H5", style: "header-five" },
    // { label: "H6", style: "header-six" },
    { label: "Blockquote", style: "blockquote", icon: <FormatQuoteIcon />},
    { label: "UL", style: "unordered-list-item", icon: <FormatListBulletedIcon/>},
    { label: "OL", style: "ordered-list-item", icon: <FormatListNumberedIcon/> },
    { label: "Code Block", style: "code-block", icon: <CodeIcon /> }
  ];

export const COLOR: Style[] = [
    {label: "red", style: "rgba(255, 0, 0, 1.0)"},
    {label: "salomon", style: "rgba(250, 128, 114, 1.0)"},
    {label: "orange", style: "rgba(255, 127, 0, 1.0)"},
    {label: "orange", style: "rgba(255, 236, 0, 1.0)"},
    {label: "olive", style: "#8b8b01"},
    {label: "green", style: "rgba(0, 180, 0, 1.0)"},
    {label: "blue", style: "rgba(0, 0, 255, 1.0)"},
    {label: "indigo", style: "rgba(75, 0, 130, 1.0)"},
    {label: "violet", style: "rgba(127, 0, 255, 1.0)"},
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