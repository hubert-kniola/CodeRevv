import { Editor, EditorState, RichUtils } from 'draft-js';
import { FC, useState, useRef } from 'react';
import { Wrapper, Container, Toolbar, Button } from './style';
import { inlineStyles, InlineStyle } from './constTemp';

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

  const isActive = (style: InlineStyle) => {
    if (style.type === 'style') {
      const currentInlineStyle = editorState.getCurrentInlineStyle();
      console.log(currentInlineStyle);
      return currentInlineStyle.has(style.value);
    }
    return false;
  };

  const editor = useRef(null);
  return (
    <Wrapper>
      <Container>
        <Toolbar>
          {inlineStyles.map((style) => (
            <Button className={isActive(style) ? 'active' : ''}> {style.label}</Button>
          ))}
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
