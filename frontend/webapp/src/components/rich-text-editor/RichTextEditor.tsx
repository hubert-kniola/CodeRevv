import { Editor, EditorState, RichUtils } from 'draft-js';
import { FC, useState, useRef, MouseEvent } from 'react';
import { Wrapper, Container, Toolbar, Button } from './style';
import { inlineStyles, InlineStyle, BLOCK_TYPES } from './constTemp';

export const RichTextEditor: FC = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const change = (state: EditorState) => {
    setEditorState(() => state);
  };

  const handleKeyCommand = (command: string, state: EditorState) => {
    const newState = RichUtils.handleKeyCommand(state, command);

    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const _toggleInlineStyle = (inlineStyle: string) => {
    setEditorState((state) => RichUtils.toggleInlineStyle(state, inlineStyle));
  };

  const _toggleBlockType = (blockType: string) => {
    setEditorState((state) => RichUtils.toggleBlockType(state, blockType));
  };

  const editor = useRef(null);

  return (
    <Wrapper>
      <Container>
        <Toolbar>
          <InlineStyleControls editorState={editorState} onToggle={_toggleInlineStyle} />
          <BlockStyleControle editorState={editorState} onToggle={_toggleBlockType}/>
        </Toolbar>
        <Editor
          placeholder="Twoja ostatnia myśl?"
          ref={editor}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={change}
        />
      </Container>
    </Wrapper>
  );
};

type InlineProps = {
  editorState: EditorState;
  onToggle: (inlineStyle: string) => void;
};

const InlineStyleControls: FC<InlineProps> = ({ editorState, onToggle }) => {
  const currentStyle = editorState.getCurrentInlineStyle();


  return (
    <div>
      {inlineStyles.map((type) => (
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

const BlockStyleControle: FC<InlineProps> = ({ editorState, onToggle }) => {
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
