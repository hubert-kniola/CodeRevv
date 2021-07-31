import { AtomicBlockUtils, Entity } from 'draft-js';
import { Image } from '../special-block'

const Media = (props) => {
  const { block, contentState } = props;
  const entity = contentState.getEntity(block.getEntityAt(0))
  const { src } = entity.getData();
  const type = entity.getType();

  let media;

  if (type === 'image') {
    media = <Image src={src} />;
  }
  return media;
};

export const MediaBlockRenderer = (block) => {
  if (block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false,
    };
  }
  return null;
};

export const addMedia = (type, editorState) => {
  const src = window.prompt('Enter a URL');
  if (!src) {
    return editorState;
  }

  const entityKey = Entity.create(type, 'IMMUTABLE', { src });
  const newState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
  // console.log(
  //   convertToRaw(editorState.getCurrentContent()),
  //   convertToRaw(newState.getCurrentContent()),
  //   Entity.get(entityKey)
  // );
  return newState;
};


