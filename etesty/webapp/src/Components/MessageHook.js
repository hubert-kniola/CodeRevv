import { useState } from 'react';

const MessageHook = () => {
    const [message, setMessage] = useState("XD");

    const changeMessage = () => {
        setMessage(message + "~");
    };

    return [message, changeMessage];
}

export default MessageHook;
