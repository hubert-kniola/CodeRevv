import { useState } from 'react';

export const useMessage = () => {
    const [message, setMessage] = useState("XD");

    const changeMessage = () => {
        setMessage(message + "~");
    };

    return [message, changeMessage];
};