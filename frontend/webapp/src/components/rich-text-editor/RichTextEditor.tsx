import React, { FC, useRef, useState } from 'react';
import {
  convertFromRaw,
  EditorState,
  RichUtils,
  ContentBlock,
  getDefaultKeyBinding,
  Modifier,
  RawDraftContentState,
} from 'draft-js';

import { Wrapper, Container, Space } from './style';
import Toolbar from './toolbar/Toolbar';
import 'draft-js/dist/Draft.css';

import Editor from '@draft-js-plugins/editor';
import createImagePlugin from '@draft-js-plugins/image';


const imagePlugin = createImagePlugin();
const plugins = [imagePlugin];

const initialState = {
  entityMap: {
    0: {
      type: 'IMAGE',
      mutability: 'IMMUTABLE',
      data: {
        src: 'components/rich-text-editor/canada-landscape-small.jpg',
      },
    },
  },
  blocks: [
    {
      key: '9gm3s',
      text:
        'You can have images in your text field. This is a very rudimentary example, but you can enhance the image plugin with resizing, focus or alignment plugins.',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: 'ov7r',
      text: ' ',
      type: 'atomic',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [
        {
          offset: 0,
          length: 1,
          key: 0,
        },
      ],
      data: {},
    },
    {
      key: 'e23a8',
      text: 'See advanced examples further down …',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
};
/* eslint-enable */





//https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/draft-js/index.d.ts
type SyntheticKeyboardEvent = React.KeyboardEvent<{}>;

export const RichTextEditor: FC = () => {
  const [editorState, setEditorState] = useState(EditorState.createWithContent(convertFromRaw(initialState as RawDraftContentState)));

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

    if (newState) {
      e.preventDefault();
      let newContentState = Modifier.replaceText(editorState.getCurrentContent(), editorState.getSelection(), '    ');
      setEditorState(newState);
      //setEditorState(state => EditorState.push(state, newContentState, 'insert-characters'));
      return 'handled';
    } else {
      console.log('jestem');
      return 'not-handled';
    }
  };

  const keyBinding = (e: SyntheticKeyboardEvent): string | null => {
    if (e.code === 'TAB' /* `TAB` key */) {
      return 'myeditor-tab';
    }
    return getDefaultKeyBinding(e);
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

  const editorRef = useRef();

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
            ref={editorRef.current}
            plugins={plugins}
          />
        </Space>
      </Container>
    </Wrapper>
  );
};
