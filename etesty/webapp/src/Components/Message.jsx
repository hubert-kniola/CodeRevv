import MessageHook from "./Hooks/MessageHook";
import styled from "styled-components";

const Message = () => {
  const { message, changeMessage } = MessageHook();

  return <StyledDiv onClick={changeMessage}>{message}</StyledDiv>;
};

export default Message;

const StyledDiv = styled.div`
  background: orange;
  font-weight: bold;
`;
