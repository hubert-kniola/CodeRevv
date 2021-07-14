import { ReactElement } from 'react';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import CodeIcon from '@material-ui/icons/Code';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';

export type InlineStyle = {
    label: string;
    style: string;
    icon?: ReactElement;
}

export const INLINE_STYLE: InlineStyle[] =[
    { label: "Bold", style: "BOLD", icon: <FormatBoldIcon />},
    { label: "Italic", style: "ITALIC", icon: <FormatItalicIcon /> },
    { label: "Underline", style: "UNDERLINE", icon: <FormatUnderlinedIcon />},
    { label: "Monospace", style: "CODE", icon: <CodeIcon /> }
]

export const BLOCK_TYPES:  InlineStyle[] = [
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