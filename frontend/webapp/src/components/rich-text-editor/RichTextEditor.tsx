import { FC, useState, useRef } from 'react';
import { Editor, EditorState, RichUtils, ContentBlock, getDefaultKeyBinding, KeyBindingUtil, DraftHandleValue, Modifier } from 'draft-js';
import { Wrapper, Container, Space } from './style';
import Toolbar from './toolbar/Toolbar';

//https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/draft-js/index.d.ts
type SyntheticKeyboardEvent = React.KeyboardEvent<{}>;
const { hasCommandModifier } = KeyBindingUtil;

export const RichTextEditor: FC = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const change = (state: EditorState) => {
    setEditorState(() => state);
  };

  const handleKeyCommand = ( command: string, state: EditorState) => {
    
    if (command === 'myeditor-tab') {
      let newContentState = Modifier.replaceText(
        state.getCurrentContent(),
        state.getSelection(),
        '    '
      );
        setEditorState(state => EditorState.push(state, newContentState, 'insert-characters'));
        return 'handled';

    }
    else
    {
      const newState = RichUtils.handleKeyCommand(state, command);
  
      if (newState) {
        setEditorState(newState);
        return 'handled';
      }
    }
    return 'not-handled';
  };

  const tabHandler = (e: SyntheticKeyboardEvent) => {
    e.preventDefault() ;
    const newState = RichUtils.onTab(e, editorState, 4);

    if (newState) {
      setEditorState(newState);
      return 'handled';
    } else {
      return 'not-handled';
    }
  };

  const keyBinding = (e: SyntheticKeyboardEvent): string | null => {
    console.log(e.code);
    if (e.code === 'TAB'/* `TAB` key */ ) {
      setEditorState(RichUtils.onTab(e, editorState, 4));
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
            keyBindingFn={keyBinding}
            onTab={tabHandler}
            spellCheck={true}
          />
        </Space>
      </Container>
    </Wrapper>
  );
};
