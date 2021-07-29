import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import AlertMessage from '../AlertMessage';
import api from '../api/api';
import { setSession } from '../security/Session';

export default function Login() {

    const history = useHistory();

    const [state, setState] = useState({
        username: '',
        password: ''
    });

    const [message, setMessage] = useState({
        show: false, text: '', type: ''
    });

    const handleChangeUsername = (event) => {
        setState({ ...state, username: event.target.value });
    }

    const handleChangePassword = (event) => {
        setState({ ...state, password: event.target.value });
    }


    const submitForm = (e) => {
        e.preventDefault();
        console.log(state);
        api.post("/login", { username: state.username, password: state.password }).then(res => {
            console.log("Success!");
            setSession(res.headers.authorization)
            history.push("/manager");
            setMessage({ show: false });
        }
        ).catch(e => {
            console.log(e);
            setMessage({ text: 'Usuário ou senha inválidos', show: true, type: 'danger' });
        });
    }

    return (
        <div className="Login">
            <Form onSubmit={submitForm}>
                <Form.Group size="lg"
                    controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        autoFocus
                        type="tet"
                        value={state.username}
                        onChange={handleChangeUsername}
                    />
                </Form.Group>
                <Form.Group size="lg"
                    controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"

                        value={state.password}
                        onChange={handleChangePassword}
                    />
                </Form.Group>
                <Button block size="lg" type="submit"
                >
                    Login
                </Button>
                <AlertMessage  message={message} setMessage={setMessage}></AlertMessage>
            </Form>

        </div>

    )
}