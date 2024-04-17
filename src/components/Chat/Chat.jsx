import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Chat.module.scss';
import io from 'socket.io-client';

import Messages from './components/Messages/Messages';
import Header from './components/Header/Header';
import SendMessage from './components/SendMessage/SendMessage';

// const socket = io.connect('http://localhost:5000');
const socket = io.connect('https://chat-server-k0w1.onrender.com');

export default function Chat() {
    const { search } = useLocation();
    const [params, setParams] = useState({ user: '', room: '' });

    useEffect(() => {
        const searchParams = Object.fromEntries(new URLSearchParams(search));
        setParams(searchParams);
        socket.emit('join', searchParams);

        return () => socket.off();
    }, [search]);

    return (
        <div className={styles.chat}>
            <Header socket={socket} params={params} />
            <div className={styles.container}>
                <Messages socket={socket} params={params} />
                <SendMessage socket={socket} params={params} />
            </div>
        </div>
    );
}
