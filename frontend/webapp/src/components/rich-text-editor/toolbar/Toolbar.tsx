import { BLOCK_TYPES, INLINE_STYLE, ToolbarProp } from 'const';
import { EditorState, RichUtils } from 'draft-js';
import { FC, MouseEvent, ReactElement } from 'react';
import { Container, Button } from './style';

type ButtonProps = {
  onToggle: (inlineStyle: string) => void;
  icon: ReactElement | string;
  active: boolean;
  style: string;
};

const StyleButton: FC<ButtonProps> = ({ onToggle, icon, active, style }) => {
  const toggleHandler = (e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    onToggle(style);
  };

  return (
    <Button className={active ? 'active' : ''} onMouseDown={toggleHandler}>
      {icon}
    </Button>
  );
};


const Toolbar: FC<ToolbarProp> = ({ editorState, setEditorState}) => {
  //inline
  const currentStyle = editorState.getCurrentInlineStyle();

  //block
  const selection = editorState.getSelection();
  const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

  const toggleInlineStyle = (inlineStyle: string) => {
    setEditorState((state) => RichUtils.toggleInlineStyle(state, inlineStyle));
  };

  const toggleBlockType = (blockType: string) => {
    setEditorState((state) => RichUtils.toggleBlockType(state, blockType));
  };

  return (
    <Container>
      {INLINE_STYLE.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          icon={type.icon ? type.icon : type.label}
          onToggle={toggleInlineStyle}
          style={type.style}
        />
      ))}

      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          icon={type.icon ? type.icon : type.label}
          onToggle={toggleBlockType}
          style={type.style}
        />
      ))}
    </Container>
  );
};

export default Toolbar;
