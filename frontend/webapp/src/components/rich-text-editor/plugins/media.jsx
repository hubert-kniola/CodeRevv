import { Entity } from 'draft-js';
import { IMG } from './style'

const Image = (props) => {
  return <IMG src={props.src} />;
};

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
