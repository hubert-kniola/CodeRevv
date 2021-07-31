import { FC, useState } from 'react';
import { Editor, EditorState, RichUtils, Modifier, DraftEditorCommand, ContentBlock } from 'draft-js';
import { Wrapper, Container, Space } from './style';
import Toolbar from './toolbar/Toolbar';
import { mediaBlockRenderer, compositeDecorator } from './plugins';
import { DEFAULT_PLACEHOLDER, SyntheticKeyboardEvent } from 'const';

type RichTextEditorType = {
  readOnly: boolean;
  widht?: string;
  height?: string;
  placeholder?: string
};

export const RichTextEditor: FC<RichTextEditorType> = ({ readOnly = false, widht, height, placeholder, }) => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty(compositeDecorator));

  const handleKeyCommand = (command: DraftEditorCommand, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const myBlockStyleFn = (contentBlock: ContentBlock) => {
    const type = contentBlock.getType();
    if (type === 'blockquote') return 'custom-blockquote';
    else if (type === 'code-block') return 'custome-code';
    return '';
  };

  const tabHandler = (e: SyntheticKeyboardEvent) => {
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
    <>
      {!readOnly ? (
        <Wrapper>
          <Container>
            <Toolbar editorState={editorState} setEditorState={setEditorState} />
            <Space>
              <Editor
                editorState={editorState}
                onChange={setEditorState}
                handleKeyCommand={handleKeyCommand}
                blockStyleFn={myBlockStyleFn}
                placeholder={ placeholder ?  placeholder : DEFAULT_PLACEHOLDER }
                onTab={tabHandler}
                blockRendererFn={mediaBlockRenderer}
              />
            </Space>
          </Container>
        </Wrapper>
      ) : (
          <Space >
            <Editor
              editorState={editorState}
              readOnly={true}
              onChange={setEditorState}
              blockStyleFn={myBlockStyleFn}
              blockRendererFn={mediaBlockRenderer}
            />
          </Space>
      )}
    </>
  );
};
