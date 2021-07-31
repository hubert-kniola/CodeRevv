import { CompositeDecorator, ContentBlock } from 'draft-js';
import { HashtagSpan } from '../special-block'

const HASHTAG_REGEX = /\#[\w\u0590-\u05ff]+/g;
const QUOTE_REGEX = /\"[\w\u0590-\u05ff]+"/g;

const findWithRegex = (regex: RegExp, contentBlock: ContentBlock, callback: (start: number, end: number) => void) => {
  const text = contentBlock.getText();
  let matchArr, start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
};



const hashtagStrategy = (contentBlock: ContentBlock, callback: (start: number, end: number) => void) => {
  findWithRegex(HASHTAG_REGEX, contentBlock, callback);
};

const quoteStrategy = (contentBlock: ContentBlock, callback: (start: number, end: number) => void) => {
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

