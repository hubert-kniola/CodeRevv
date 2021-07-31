import { CompositeDecorator } from 'draft-js';
import { Span } from './style';

const HashtagSpan = (props) => {
  return <Span {...props}>{props.children}</Span>;
};

const HASHTAG_REGEX = /\#[\w\u0590-\u05ff]+/g;

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
