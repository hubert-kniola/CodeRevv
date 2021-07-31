import * as React from 'react';
import * as Immutable from 'immutable';

import {
  Editor,
  EditorState,
  Modifier,
  RichUtils,
  SelectionState,
  getDefaultKeyBinding,
  ContentState,
  convertFromHTML,
  convertToRaw,
  CompositeDecorator,
} from 'draft-js';

const SPLIT_HEADER_BLOCK = 'split-header-block';

export const KEYCODES = {
  ENTER: 13,
};

const HANDLE_REGEX = /\@[\w]+/g;

class HandleSpan extends React.Component {
  render() {
    return <span>{this.props.children}</span>;
  }
}

export class RichEditorExample extends React.Component {
  static initState() {
    const sampleMarkup =
      '<b>Bold text</b>, <i>Italic text</i><br/ ><br />' +
      '<a href="http://www.facebook.com">Example link</a><br /><br/ >' +
      '<img src="image.png" height="112" width="200" />';
    const blocksFromHTML = convertFromHTML(sampleMarkup);
    const state = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
    const decorator = new CompositeDecorator([
      {
        strategy(block, callback) {
          const text = block.getText();
          let matchArr, start;
          while ((matchArr = HANDLE_REGEX.exec(text)) !== null) {
            start = matchArr.index;
            callback(start, start + matchArr[0].length);
          }
        },
        component: HandleSpan,
      },
    ]);
    return { editorState: EditorState.createWithContent(state, decorator) };
  }
  state = RichEditorExample.initState();

  onChange = (editorState) => {
    this.setState({ editorState });
  };

  keyBindingFn(e) {
    if (e.keyCode === KEYCODES.ENTER) {
      const { editorState } = this.state;
      const contentState = editorState.getCurrentContent();
      const selectionState = editorState.getSelection();

      // only split headers into header and unstyled if we press 'Enter'
      // at the end of a header (without text selected)
      if (selectionState.isCollapsed()) {
        const endKey = selectionState.getEndKey();
        const endOffset = selectionState.getEndOffset();
        const endBlock = contentState.getBlockForKey(endKey);
        if (isHeaderBlock(endBlock) && endOffset === endBlock.getText().length) {
          return SPLIT_HEADER_BLOCK;
        }
      }
    }

    return getDefaultKeyBinding(e);
  }

  handleKeyCommand(command, editorState, eventTimeStamp) {
    if (command === SPLIT_HEADER_BLOCK) {
      this.onChange(this.splitHeaderToNewBlock());
      return 'handled';
    }

    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      this.onChange(newState);
      return 'handled';
    }

    return 'not-handled';
  }

  toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  toggleInlineStyle(inlineStyle) {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
  }

  toggleCodeBlockLanguage(language) {
    const { editorState } = this.state;
    const contentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();

    const blockData = Immutable.Map([['language', language]]);
    const contentWithData = Modifier.setBlockData(contentState, selection, blockData);
    this.onChange(EditorState.push(editorState, contentWithData, 'change-block-data'));
  }

  splitHeaderToNewBlock() {
    const { editorState } = this.state;
    const selection = editorState.getSelection();

    // Add a new block after the cursor
    const contentWithBlock = Modifier.splitBlock(editorState.getCurrentContent(), selection);

    // Change the new block type to be normal 'unstyled' text,
    const newBlock = contentWithBlock.getBlockAfter(selection.getEndKey());
    // Return the current EditorState when a block does not exist
    if (newBlock === undefined) {
      return editorState;
    }
    const contentWithUnstyledBlock = Modifier.setBlockType(
      contentWithBlock,
      SelectionState.createEmpty(newBlock.getKey()),
      'unstyled'
    );

    // push the new state with 'insert-characters' to preserve the undo/redo stack
    const stateWithNewline = EditorState.push(editorState, contentWithUnstyledBlock, 'insert-characters');

    // manually move the cursor to the next line (as expected)
    const nextState = EditorState.forceSelection(stateWithNewline, SelectionState.createEmpty(newBlock.getKey()));

    return nextState;
  }

  render() {
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = this.state.editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <div className="RichEditor-root">
        <BlockStyleControls editorState={this.state.editorState} onToggle={this.toggleBlockType} />
        <InlineStyleControls editorState={this.state.editorState} onToggle={this.toggleInlineStyle} />
        <CodeBlockTypeControl editorState={this.state.editorState} onToggle={this.toggleCodeBlockLanguage} />
        <div className={className}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorKey="test-key"
            editorState={this.state.editorState}
            keyBindingFn={this.keyBindingFn}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            placeholder="Tell a story..."
            ref="editor"
            spellCheck={true}
            preserveSelectionOnBlur={false}
          />
        </div>
      </div>
    );
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    default:
      return '';
  }
}

class StyleButton extends React.Component {
  constructor(props) {
    super(props);
  }

  onToggle(event) {
    event.preventDefault();
    this.props.onToggle(this.props.style);
  }

  render() {
    let className = 'RichEditor-styleButton';

    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span className={className} onMouseDown={(e) => this.onToggle(e)}>
        {this.props.label}
      </span>
    );
  }
}

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code Block', style: 'code-block' },
];

const isHeaderBlock = (block) => {
  switch (block.getType()) {
    case 'header-one':
    case 'header-two':
    case 'header-three':
    case 'header-four':
    case 'header-five':
    case 'header-six': {
      return true;
    }
    default:
      return false;
  }
};

const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

var INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
];

const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

const SUPPORTED_LANGUAGES = [
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Java', value: 'java' },
  { label: 'Python', value: 'python' },
  { label: 'C++', value: 'c++' },
];

const CodeBlockTypeControl = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const block = editorState.getCurrentContent().getBlockForKey(selection.getStartKey());

  if (block.getType() === 'code-block') {
    return (
      <div className="RichEditor-controls">
        {SUPPORTED_LANGUAGES.map((language) => (
          <StyleButton
            key={language.label}
            active={block.getData().get('language') === language}
            label={language.label}
            onToggle={props.onToggle}
            style={language.value}
          />
        ))}
      </div>
    );
  } else {
    return null;
  }
};

// ReactDOM.render(
//   <RichEditorExample />,
//   document.getElementById('target')
// );

const editorState = EditorState.createEmpty();

const selection = editorState.getSelection();
const newSelection = selection.merge({ focusKey: '8ajs', focusOffset: 0, isBackward: true });
EditorState.forceSelection(editorState, newSelection);

const contentState = editorState.getCurrentContent();
const entityMap = contentState.getEntityMap();
const rawContentState = convertToRaw(contentState);

rawContentState.blocks.forEach((block) => {
  block.entityRanges.forEach((entityRange) => {
    const { key, offset, length } = entityRange;
    const entity = rawContentState.entityMap[key];
    const entityType = entity.type;
    const entityMutability = entity.mutability;
    console.log(entityType, entityMutability, offset, length);
  });

  block.inlineStyleRanges.forEach((inlineStyleRange) => {
    const { offset, length } = inlineStyleRange;
    const inlineStyle = inlineStyleRange.style;
    console.log(inlineStyle, offset, length);
  });

  if (block.type === 'code-block' && block.data.language) {
    console.log(block.data.language);
  }
});

const entities = contentState.getAllEntities();
entities.forEach((entity) => {
  console.log(entity.getType(), entity.getData());
});
