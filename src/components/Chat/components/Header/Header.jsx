import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';

export default function Header({ socket, params }) {
    const [usersCount, setUsersCount] = useState(0);
    const navigate = useNavigate();

    const letfRoom = () => {
        socket.emit('leftRoom', { params });
        navigate('/');
    };

    useEffect(() => {
        socket.on('room', ({ data: { users } }) => {
            setUsersCount(users.length);
        });
    }, []);

    return (
        <div className={styles.header}>
            <h1>Chat: {params.room}</h1>
            <div className={styles.users}>
                {usersCount} {usersCount > 1 ? 'users are' : 'user is'} online
            </div>
            <button className={styles.button} onClick={letfRoom}>
                Leave chat
            </button>
        </div>
    );
}
