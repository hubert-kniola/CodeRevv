import { FC, MouseEvent, useState } from 'react';
import { EditorState, Modifier, RichUtils } from 'draft-js';
import { Container, Color, Span } from './style';
import { COLOR, Style, ToolbarProp } from 'const';
import { ContentState } from 'draft-js';
import { Toolbar } from '@material-ui/core';

const styles = {
  root: {
    fontFamily: "'Georgia', serif",
    fontSize: 14,
    padding: 20,
    width: 600,
  },
  editor: {
    borderTop: '1px solid #ddd',
    cursor: 'text',
    fontSize: 16,
    marginTop: 20,
    minHeight: 400,
    paddingTop: 20,
  },
  controls: {
    fontFamily: "'Helvetica', sans-serif",
    fontSize: 14,
    marginBottom: 10,
    userSelect: 'none',
  },
  styleButton: {
    color: '#999',
    cursor: 'pointer',
    marginRight: 16,
    padding: '2px 0',
  },
};

type ColorControlsProps = {
  editorState: EditorState;
};

type StyleButtonType = {
  active: boolean;
  label: string;
  onToggle: (toggledColor: string) => void;
  style: string;
};

type Test = {
  styleButton: {
    color: string;
    cursor: string;
    marginRight: number;
    padding: string;
  };
  colorStyleMap: {
    color: string | undefined;
  };
};

const StyleButton: FC<StyleButtonType> = ({ active, label, onToggle, style }) => {
  const onToggleHandler = (e: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    onToggle(style);
  };

  return (
    <Span color={colorStyleMap.find(item => item.label === style )!.color} className={active ? 'active' : ''} onMouseDown={onToggleHandler}>
      {label}
    </Span>
  );
};

var COLORS = [
  { label: 'Red', style: 'red' },
  { label: 'Orange', style: 'orange' },
  { label: 'Yellow', style: 'yellow' },
  { label: 'Green', style: 'green' },
  { label: 'Blue', style: 'blue' },
  { label: 'Indigo', style: 'indigo' },
  { label: 'Violet', style: 'violet' },
];

export const ColorControls: FC<ToolbarProp> = ({ editorState, setEditorState }) => {
  let currentStyle = editorState.getCurrentInlineStyle();

  const _toggleColor = (toggledColor: string) => {
    const selection = editorState.getSelection();

    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(colorStyleMap).reduce((contentState, color) => {
      return Modifier.removeInlineStyle(contentState, selection, color);
    }, editorState.getCurrentContent());

    let nextEditorState = EditorState.push(editorState, nextContentState, 'change-inline-style');

    const currentStyle = editorState.getCurrentInlineStyle();

    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, color) => {
        return RichUtils.toggleInlineStyle(state!, color!);
      }, nextEditorState);
    }

    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledColor)) {
      nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, toggledColor);
    }
    setEditorState(state => EditorState.push(state, nextContentState, 'change-inline-style'))
  };

  return (
    <div
      className={`
      'fontFamily': 'Helvetica, sans-serif',
      'fontSize': '14',
      'marginBottom': '10',
      'userSelect': 'none',
      `}
    >
      {COLORS.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={_toggleColor}
          style={type.style}
        />
      ))}
    </div>
  );
};

// This object provides the styling information for our custom color
// styles.
const colorStyleMap = [
  {
    label: 'red', color: 'rgba(255, 0, 0, 1.0)',
  },
  {
    label: 'orange', color: 'rgba(255, 127, 0, 1.0)',
  },
  {
    label: 'yellow', color: 'rgba(180, 180, 0, 1.0)',
  },
  {
    label: 'green', color: 'rgba(0, 180, 0, 1.0)',
  },
  {
    label: 'blue', color: 'rgba(0, 0, 255, 1.0)',
  },
  {
    label: 'indigo', color: 'rgba(75, 0, 130, 1.0)',
  },
  {
    label: 'violet', color: 'rgba(127, 0, 255, 1.0)',
  },
]
