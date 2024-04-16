import React from 'react';
import styles from './Header.module.scss';

export default function Header({ room, usersCount, letfRoom }) {
    return (
        <div className={styles.header}>
            <div className={styles.title}>Chat: {room}</div>
            <div className={styles.users}>
                {usersCount} {usersCount > 1 ? 'users are' : 'user is'} online
            </div>
            <button className={styles.button} onClick={letfRoom}>
                Leave chat
            </button>
        </div>
    );
}
