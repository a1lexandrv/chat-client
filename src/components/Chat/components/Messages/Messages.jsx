import { useEffect, useRef, useState } from 'react';
import styles from './Messages.module.scss';

export default function Messages({ socket, params }) {
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        socket.on('message', ({ data }) => {
            setMessages((prevState) => [...prevState, data]);
        });
    }, []);

    return (
        <div className={styles.messages}>
            {messages.map(({ user, message }, index) => {
                const isMe =
                    user.name.trim().toLowerCase() ===
                    params.name.trim().toLowerCase();

                const className = isMe ? styles.me : styles.user;

                return user.name === 'Admin' ? (
                    <span key={index} className={styles.serviceMessage}>
                        {message}
                    </span>
                ) : (
                    <div
                        key={index}
                        className={`${styles.message} ${className}`}
                    >
                        {!isMe && (
                            <span className={styles.name}>{user.name}</span>
                        )}
                        <div className={styles.text}>{message}</div>
                    </div>
                );
            })}
            <div ref={messagesEndRef} />
        </div>
    );
}
