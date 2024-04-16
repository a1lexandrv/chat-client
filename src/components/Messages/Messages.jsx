import React, { useEffect, useRef } from 'react';
import styles from './Messages.module.scss';

export default function Messages({ messages, name }) {
    const messagesEndRef = useRef(null);

    // Функция для прокрутки контейнера вниз
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className={styles.messages}>
            {messages.map(({ user, message }, index) => {
                const isMe =
                    user.name.trim().toLowerCase() ===
                    name.trim().toLowerCase();

                const className = isMe ? styles.me : styles.user;

                if (user.name === 'Admin') {
                    return (
                        <span key={index} className={styles.serviceMessage}>
                            {message}
                        </span>
                    );
                } else {
                    return (
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
                }
            })}
            <div ref={messagesEndRef} />
        </div>
    );
}
