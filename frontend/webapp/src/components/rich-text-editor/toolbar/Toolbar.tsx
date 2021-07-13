import { BLOCK_TYPES, INLINE_STYLE } from "const";
import { EditorState } from "draft-js";
import { FC, MouseEvent, ReactElement } from "react";
import {Container, Button} from './style'

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

type ToolbarProp = {
    editorState: EditorState;
    lineToggle: (inlineStyle: string) => void;
    blockToggle: (inlineStyle: string) => void;
  };

const Toolbar:FC<ToolbarProp> = ({ editorState, lineToggle, blockToggle }) => {
    //inline
    const currentStyle = editorState.getCurrentInlineStyle();
    
    //block
    const selection = editorState.getSelection();
    const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

    
    return(
        <Container>
            {INLINE_STYLE.map((type) => (
              <StyleButton
                key={type.label}
                active={currentStyle.has(type.style)}
                icon={type.icon ? type.icon : type.label}
                onToggle={lineToggle}
                style={type.style}
              />
          ))}
          
          {BLOCK_TYPES.map((type) => (
          <StyleButton
            key={type.label}
            active={type.style === blockType}
            icon={type.icon ? type.icon : type.label}
            onToggle={blockToggle}
            style={type.style}
          />))}


        </Container>
    )
}

export default Toolbar;