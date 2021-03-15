import MessageHook from "./MessageHook";

const Message = () => {
  const [message, changeMessage] = MessageHook();

  return <div onClick={changeMessage}>{message}</div>;
};

export default Message;
