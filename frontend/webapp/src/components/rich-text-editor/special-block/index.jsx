import {IMG, Span} from './style'

export const Image = (props) => {
    return <IMG src={props.src} />;
  };

export const HashtagSpan = (props) => {
    return <Span {...props}>{props.children}</Span>;
  };
  
  