import { ADDITIONAL_FUNCTIONS, TOOLBAR_STYLE, INLINE_STYLE_TYPE, INSERT_PHOTO_ICO, ToolbarProp, ADDITIONAL_FUNCTION_STYLE } from 'const';
import { EditorState, RichUtils } from 'draft-js';
import { FC, MouseEvent, ReactElement } from 'react';
import { addMedia } from '../plugins';
import { Container, Button } from './style';

type ButtonProps = {
  onToggle?: (inlineStyle: string) => void;
  onClick?: () => void;
  icon: ReactElement | string;
  active: boolean;
  style: string;
};

const StyleButton: FC<ButtonProps> = ({ onToggle, onClick, icon, active, style }) => {
  const toggleHandler = (e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    if (onToggle != null) {
      onToggle(style);
    } else if (onClick != null) {
      onClick();
    }
  };

  return (
    <Button className={onToggle != null ? (active ? 'active' : '') : style} onMouseDown={toggleHandler}>
      {icon}
    </Button>
  );
};

const Toolbar: FC<ToolbarProp> = ({ editorState, setEditorState }) => {
  //inline
  const currentStyle = editorState.getCurrentInlineStyle();

  //block
  const selection = editorState.getSelection();
  const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

  const toggleInlineStyle = (inlineStyle: string) => {
    setEditorState((state) => RichUtils.toggleInlineStyle(state, inlineStyle!));
  };

  const toggleBlockType = (blockType: string) => {
    setEditorState((state) => RichUtils.toggleBlockType(state, blockType!));
  };
  
  const addImage = () => {
    setEditorState(addMedia('image', editorState) as EditorState );
  };

  return (
    <Container>
      {TOOLBAR_STYLE.map((type) => (
        <StyleButton
          key={type.label}
          active={type.type === INLINE_STYLE_TYPE ? currentStyle.has(type.style) : type.style === blockType}
          icon={type.icon ? type.icon : type.label}
          onToggle={type.type === INLINE_STYLE_TYPE ? toggleInlineStyle : toggleBlockType}
          style={type.style}
        />
      ))}

      {ADDITIONAL_FUNCTIONS.map((type) => (
        <StyleButton
          key={type.label}
          active={false}
          icon={type.icon ? type.icon : type.label}
          onClick={() => type.onClick(setEditorState)}
          style={type.active(editorState) ? type.style : ''}
        />
      ))}
        <StyleButton
          key='insert a photo'
          active={false}
          icon={INSERT_PHOTO_ICO}
          onClick={() => addImage()}
          style={ADDITIONAL_FUNCTION_STYLE}
        />
    </Container>
  );
};

export default Toolbar;
