import { useEffect, useRef, useState } from 'react';
import styles from './Messages.module.scss';

export default function Messages({ socket, params }) {
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    const removeMessage = (messageId, params) => {
        setMessages(messages.filter((message) => message.id !== messageId));

        socket.emit('removeMessage', { messageId, params });
    };

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        socket.on('message', ({ data }) => {
            setMessages((prevState) => [...prevState, data]);
        });
    }, []);

    useEffect(() => {
        socket.on('messageHistory', ({ data }) => {
            setMessages(data);
        });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className={styles.messages}>
            {messages.map(({ user, message }, index) => {
                const isMe =
                    user.name.trim().toLowerCase() ===
                    params.name.trim().toLowerCase();

                const className = isMe ? styles.me : styles.user;

                return user.name === 'Admin' ? (
                    <span key={index} className={styles.serviceMessage}>
                        {message.text}
                    </span>
                ) : (
                    <div
                        key={message.id}
                        className={`${styles.message} ${className}`}
                        onClick={() => removeMessage(message.id, user)}
                    >
                        {!isMe && (
                            <span className={styles.name}>{user.name}</span>
                        )}
                        <div className={styles.text}>{message.text}</div>
                    </div>
                );
            })}
            <div ref={messagesEndRef} />
        </div>
    );
}
