import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Join.module.scss';

const FIELDS = {
    NAME: 'name',
    ROOM: 'room',
};

export default function Join() {
    const { NAME, ROOM } = FIELDS;
    const [values, setValues] = useState({ [NAME]: '', [ROOM]: '' });
    const navigate = useNavigate();

    const handleChange = ({ target: { value, name } }) => {
        setValues({ ...values, [name]: value });
    };

    const onSubmit = (event) => {
        const isValid = Object.values(values).every(
            (value) => value.trim() !== ''
        );

        if (isValid) {
            navigate(`/chat?name=${values[NAME]}&room=${values[ROOM]}`);
        } else {
            event.preventDefault();
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={onSubmit}>
                <h1 className={styles.title}>Join</h1>
                <input
                    className={styles.input}
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={values[NAME]}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                ></input>
                <input
                    className={styles.input}
                    type="text"
                    name="room"
                    placeholder="Room"
                    value={values[ROOM]}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                ></input>
                <button type="submit" className={styles.button}>
                    Sign In
                </button>
            </form>
        </div>
    );
}
