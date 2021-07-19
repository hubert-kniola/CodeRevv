import { FC, useRef, useState } from 'react';
import { EditorState, RichUtils, ContentBlock, getDefaultKeyBinding, Modifier, CompositeDecorator } from 'draft-js';
import Toolbar from './toolbar/Toolbar';
import Editor from '@draft-js-plugins/editor';
import { Wrapper, Container, Space, Span } from './style';
import { plugins, SyntheticKeyboardEvent } from 'const';


export const RichTextEditor: FC = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [placeholder, setPlaceholder] = useState('Co tam ?');
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

  const tabHandler = (e: SyntheticKeyboardEvent) => {
    const newState = RichUtils.onTab(e, editorState, 4);
    
    const selection = editorState.getSelection();
    const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
    
    if (newState) {
      e.preventDefault();
      if(blockType === 'code-block'){
        let newContentState = Modifier.replaceText(editorState.getCurrentContent(), editorState.getSelection(), '    ');
        setEditorState(state => EditorState.push(state, newContentState, 'insert-characters'));
      }else{
        setEditorState(newState);
      }
      return 'handled';
    } else {
      return 'not-handled';
    }
  };

  const keyBinding = (e: SyntheticKeyboardEvent): string | null => {
    if (e.code === 'TAB' /* `TAB` key */) {
      return 'myeditor-tab';
    }
    return getDefaultKeyBinding(e);
  };

  const myBlockStyleFn = (contentBlock: ContentBlock): string => {
    const type = contentBlock.getType();
    if (type === 'blockquote') return 'custom-blockquote';
    else if (type === 'code-block') return 'custome-code';
    return '';
  };

  const focusHandler = () => {
    setPlaceholder('');
  };

  const styleMap = {
    STRIKETHROUGH: {
      textDecoration: 'line-through',
    },
  };

  const editorRef = useRef();

  return (
    <Wrapper>
      <Container>
        <Toolbar editorState={editorState} setEditorState={setEditorState} />
        <Space>
          <Editor
            customStyleMap={styleMap}
            placeholder={placeholder}
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            onChange={change}
            blockStyleFn={myBlockStyleFn}
            keyBindingFn={keyBinding}
            onTab={tabHandler}
            ref={editorRef.current}
            plugins={plugins}
            onFocus={focusHandler}
          />
        </Space>
      </Container>
    </Wrapper>
  );
};
