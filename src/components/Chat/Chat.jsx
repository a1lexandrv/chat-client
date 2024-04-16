import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Chat.module.scss';
import io from 'socket.io-client';

import Messages from '../Messages/Messages';
import Header from '../Header/Header';
import SendMessage from '../SendMessage/SendMessage';

// const socket = io.connect('http://localhost:5000');
const socket = io.connect('https://chat-server-k0w1.onrender.com');

export default function Chat() {
    const { search } = useLocation();
    const navigate = useNavigate();
    const [params, setParams] = useState({ user: '', room: '' });
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [usersCount, setUsersCount] = useState(0);

    const letfRoom = () => {
        socket.emit('leftRoom', { params });
        navigate('/');
    };

    const handleChange = ({ target: { value } }) => {
        setMessage(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!message) return;

        socket.emit('sendMessage', { message, params });

        setMessage('');
    };

    useEffect(() => {
        const searchParams = Object.fromEntries(new URLSearchParams(search));
        setParams(searchParams);
        socket.emit('join', searchParams);

        return () => socket.off();
    }, [search]);

    useEffect(() => {
        socket.on('message', ({ data }) => {
            setMessages((prevState) => [...prevState, data]);
        });
    }, []);

    useEffect(() => {
        socket.on('room', ({ data: { users } }) => {
            setUsersCount(users.length);
        });
    }, []);

    return (
        <div className={styles.chat}>
            <Header
                room={params.room}
                usersCount={usersCount}
                letfRoom={letfRoom}
            />
            <div className={styles.container}>
                <Messages messages={messages} name={params.name} />
                <SendMessage
                    message={message}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
            </div>
        </div>
    );
}
