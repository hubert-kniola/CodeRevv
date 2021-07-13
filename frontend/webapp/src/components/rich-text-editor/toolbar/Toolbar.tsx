import { BLOCK_TYPES, INLINE_STYLE } from "const";
import { EditorState } from "draft-js";
import { FC, MouseEvent } from "react";
import {Container, Button} from './style'

type StyleControlsProps = {
    editorState: EditorState;
    onToggle: (inlineStyle: string) => void;
  };
  
  const InlineStyleControls: FC<StyleControlsProps> = ({ editorState, onToggle }) => {
    const currentStyle = editorState.getCurrentInlineStyle();
  
  
    return (
      <div>
        {INLINE_STYLE.map((type) => (
          <StyleButton
            key={type.label}
            active={currentStyle.has(type.style)}
            label={type.label}
            onToggle={onToggle}
            style={type.style}
          />
        ))}
      </div>
    );
  };
  
  const BlockStyleControls: FC<StyleControlsProps> = ({ editorState, onToggle }) => {
    const selection = editorState.getSelection();
    const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
  
    return (
      <div>
        {BLOCK_TYPES.map((type) => (
          <StyleButton
            key={type.label}
            active={type.style === blockType}
            label={type.label}
            onToggle={onToggle}
            style={type.style}
          />
        ))}
      </div>
    );
  };
  
  type ButtonProps = {
    onToggle: (inlineStyle: string) => void;
    label: string;
    active: boolean;
    style: string;
  };
  const StyleButton: FC<ButtonProps> = ({ onToggle, label, active, style }) => {
    const toggleHandler = (e: MouseEvent<HTMLSpanElement>) => {
      e.preventDefault();
      onToggle(style);
    };
  
    return (
      <Button className={active ? 'active' : ''} onMouseDown={toggleHandler}>
        {label}
      </Button>
    );
  };

type ToolbarProp = {
    editorState: EditorState;
    lineToggle: (inlineStyle: string) => void;
    blockToggle: (inlineStyle: string) => void;
  };

const Toolbar:FC<ToolbarProp> = ({ editorState, lineToggle, blockToggle }) => {
    return(
        <Container>
          <InlineStyleControls editorState={editorState} onToggle={lineToggle} />
          <BlockStyleControls editorState={editorState} onToggle={blockToggle}/>
        </Container>
    )
}

export default Toolbar;