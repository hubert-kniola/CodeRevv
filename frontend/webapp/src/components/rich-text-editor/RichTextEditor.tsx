import { Editor, EditorState, RichUtils } from 'draft-js';
import { FC, useState, useRef } from 'react';
import { Wrapper, Container } from './style';
import Toolbar from './toolbar/Toolbar';

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

  const toggleInlineStyle = (inlineStyle: string) => {
    setEditorState((state) => RichUtils.toggleInlineStyle(state, inlineStyle));
  };

  const toggleBlockType = (blockType: string) => {
    setEditorState((state) => RichUtils.toggleBlockType(state, blockType));
  };

  const editor = useRef(null);

  return (
    <Wrapper>
      <Container>
        <Toolbar
         editorState = {editorState}
         lineToggle={toggleInlineStyle}
         blockToggle={toggleBlockType}
         />
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


