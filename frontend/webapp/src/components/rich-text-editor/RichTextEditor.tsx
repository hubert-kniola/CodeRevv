import { FC, useState, useRef } from 'react';
import { Editor, EditorState, RichUtils, ContentBlock, getDefaultKeyBinding, KeyBindingUtil, DraftHandleValue, Modifier } from 'draft-js';
import { Wrapper, Container, Space } from './style';
import Toolbar from './toolbar/Toolbar';
import 'draft-js/dist/Draft.css';

//https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/draft-js/index.d.ts
type SyntheticKeyboardEvent = React.KeyboardEvent<{}>;

export const RichTextEditor: FC = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const change = (state: EditorState) => {
    setEditorState(() => state);
  };

  const handleKeyCommand = ( command: string, state: EditorState) => {
      const newState = RichUtils.handleKeyCommand(state, command);
  
      if (newState) {
        setEditorState(newState);
        return 'handled';
      }
    return 'not-handled';
  };


  const tabHandler = (e: SyntheticKeyboardEvent) => {
    const newState = RichUtils.onTab(e, editorState, 4);
    console.log(e);

    if (newState) {
      e.preventDefault();
      let newContentState = Modifier.replaceText(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        '    '
      );
      setEditorState(newState);
      //setEditorState(state => EditorState.push(state, newContentState, 'insert-characters'));
      return 'handled';
    } else {
      console.log("jestem");
      return 'not-handled';
    }
  };

  const keyBinding = (e: SyntheticKeyboardEvent): string | null => {
    if (e.code === 'TAB'/* `TAB` key */ ) {
      return 'myeditor-tab';
    }
    return getDefaultKeyBinding(e);
  }


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

  return (
    <Wrapper>
      <Container>
        <Toolbar editorState={editorState} lineToggle={toggleInlineStyle} blockToggle={toggleBlockType} />
        <Space>
          <Editor
            placeholder="Co tam ?"
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            onChange={change}
            blockStyleFn={myBlockStyleFn}
            keyBindingFn={keyBinding}
            onTab={tabHandler}
          />
        </Space>
      </Container>
    </Wrapper>
  );
};
