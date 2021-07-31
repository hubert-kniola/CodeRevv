import { CompositeDecorator } from 'draft-js';
import { HashtagSpan } from '../special-block'

const HASHTAG_REGEX = new RegExp('(#+[a-zA-Z0-9(_)]{1,})');

const findWithRegex = (regex, contentBlock, callback) => {
  const text = contentBlock.getText();
  let matchArr, start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
};

const hashtagStrategy = (contentBlock, callback, contentState) => {
  findWithRegex(HASHTAG_REGEX, contentBlock, callback);
};

export const compositeDecorator = new CompositeDecorator([
  {
    strategy: hashtagStrategy,
    component: HashtagSpan,
  },
]);
