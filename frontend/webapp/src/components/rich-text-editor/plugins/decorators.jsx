import { CompositeDecorator } from 'draft-js';
import { HashtagSpan } from '../special-block'

const HASHTAG_REGEX = /\#[\w\u0590-\u05ff]+/g;
const QUOTE_REGEX = /\"[\w\u0590-\u05ff]+"/g;

const findWithRegex = (regex, contentBlock, callback) => {
  const text = contentBlock.getText();
  let matchArr, start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
};

const hashtagStrategy = (contentBlock, callback) => {
  findWithRegex(HASHTAG_REGEX, contentBlock, callback);
};

const quoteStrategy = (contentBlock, callback) => {
  findWithRegex(QUOTE_REGEX, contentBlock, callback);
};

export const compositeDecorator = new CompositeDecorator([
  {
    strategy: hashtagStrategy,
    component: HashtagSpan,
  },
  {
    strategy: quoteStrategy,
    component: HashtagSpan,
  },
]);

