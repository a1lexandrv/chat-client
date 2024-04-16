import { useState } from 'react';
import styles from './SendMessage.module.scss';

export default function SendMessage({ socket, params }) {
    const [message, setMessage] = useState('');

    const handleChange = ({ target: { value } }) => {
        setMessage(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!message) {
            return;
        } else {
            socket.emit('sendMessage', { message, params });
            setMessage('');
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input
                className={styles.input}
                type="text"
                name="message"
                placeholder="Text your message"
                value={message}
                onChange={handleChange}
                autoComplete="off"
                required
            ></input>
            <button type="submit" className={styles.button}>
                Send
            </button>
        </form>
    );
}
