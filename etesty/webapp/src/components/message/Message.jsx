import { useMessage } from "../../hooks";
import { StyledDiv } from "./styles";

const Message = () => {
  const [message, changeMessage] = useMessage();

  return <StyledDiv onClick={changeMessage}>{message}</StyledDiv>;
};

export default Message;