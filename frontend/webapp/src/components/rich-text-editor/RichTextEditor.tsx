import { FC, useState, useRef } from 'react';
import { Editor, EditorState, RichUtils, ContentBlock } from 'draft-js';
import { Wrapper, Container, Space } from './style';
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

  const myBlockStyleFn = (contentBlock: ContentBlock): string => {
    const type = contentBlock.getType();
    if (type === 'blockquote') return 'custom-blockquote';
    else if (type === 'code-block') return 'custome-code';
    return '';
  };

  const editor = useRef(null);

  return (
    <Wrapper>
      <Container>
        <Toolbar editorState={editorState} lineToggle={toggleInlineStyle} blockToggle={toggleBlockType} />
        <Space>
          <Editor
            placeholder="Co tam ?"
            ref={editor}
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            onChange={change}
            blockStyleFn={myBlockStyleFn}
          />
        </Space>
      </Container>
    </Wrapper>
  );
};
