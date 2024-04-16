import React from 'react';
import styles from './SendMessage.module.scss';

export default function SendMessage({ message, handleChange, handleSubmit }) {
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
