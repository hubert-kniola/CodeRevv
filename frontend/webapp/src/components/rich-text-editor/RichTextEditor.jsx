import {  EditorState, RichUtils, Modifier } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import { useState } from 'react';
import { compositeDecorator } from './decorators/CompositeDecorator';
import { plugins } from './plugins/plugins';
import { Wrapper, Container, Space } from './style';
import Toolbar from './toolbar/Toolbar';

export const RichTextEditor = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty(compositeDecorator));

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const myBlockStyleFn = (contentBlock) => {
    const type = contentBlock.getType();
    if (type === 'blockquote') return 'custom-blockquote';
    else if (type === 'code-block') return 'custome-code';
    return '';
  };

  const tabHandler = (e) => {
    const newState = RichUtils.onTab(e, editorState, 4);

    const selection = editorState.getSelection();
    const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

    if (newState) {
      e.preventDefault();
      if (blockType === 'code-block') {
        let newContentState = Modifier.replaceText(editorState.getCurrentContent(), editorState.getSelection(), '    ');
        setEditorState((state) => EditorState.push(state, newContentState, 'insert-characters'));
      } else {
        setEditorState(newState);
      }
      return 'handled';
    } else {
      return 'not-handled';
    }
  };


  return (
    <Wrapper>
      <Container>
          <Toolbar 
            editorState={editorState} 
            setEditorState={setEditorState} />
        <Space>
          <Editor
            editorState={editorState}
            onChange={setEditorState}
            handleKeyCommand={handleKeyCommand}
            blockStyleFn={myBlockStyleFn}
            plugins={plugins}
            placeholder="Daj szanse! :)"
            onTab={tabHandler}
          />
        </Space>
      </Container>
    </Wrapper>
  );
};
