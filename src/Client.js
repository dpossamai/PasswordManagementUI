import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import AlertMessage from './AlertMessage';
import api from './api/api';


export default function Client(props) {

    const [state, setState] = useState();

    const [message, setMessage] = useState({
        show: false, text: '', type: ''
    });

    const requestPassword = (priority) => {
        api.post("/password/request", { priority }).then(res => {
            console.log("Success!");
            console.log(res.data);
            setState(res.data);
            setMessage({ text: 'Senha gerada com sucesso', show: true, type: 'success' });
        }
        ).catch(e => {
            console.log(e);
            setMessage({ text: 'Problema ao se conectar com o servidor. Tente novamente mais tarde', show: true, type: 'danger' });
        });
    }

    return (
        <Container>
            <Row style={{ flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center', margin: 30 }}>
                <h2 size="lg" type="text" style={{ textAlign: 'center', alignSelf: 'center', fontSize: 50 }}>Bem Vindo(a) Cliente!</h2>
            </Row>
            <Row>
                <Col>
                    <Row style={{ flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>

                        <h2 size="lg" type="text" style={{ textAlign: 'center', alignSelf: 'center', fontSize: 50 }}>Requisitar senha</h2>
                    </Row>
                    <Row style={{ flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                        <Button variant="warning" type="submit"
                            style={{ height: 200, width: 200, marginRight: 10 }}
                            onClick={() => requestPassword('P')}
                        >
                            Prioritária
                        </Button>
                        <Button variant="primary" type="submit"
                            style={{ height: 200, width: 200 }}
                            onClick={() => requestPassword('N')}
                        >
                            Normal
                        </Button>
                    </Row>
                    <Row style={{ flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                        <h2 size="lg" type="text" style={{ textAlign: 'center', alignSelf: 'center', fontSize: 50, marginTop: 20 }}>Sua Senha</h2>
                    </Row>
                    <Row style={{ flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                        <h2 size="lg" type="text" style={{ textAlign: 'center', alignSelf: 'center', fontSize: 50 }}>{state ? state : '...'}</h2>
                    </Row>
                </Col>
                {/* <Col>

                </Col> */}
                <Col style={{ flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                    <Row style={{ flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                        <h2 size="lg" type="text" style={{ fontSize: 50 }}>
                            Próxima senha
                        </h2>
                    </Row>
                    <Row style={{ flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                        <h2 size="lg" type="text" style={{ fontSize: 50 }}>
                            {/* {state ? state : '...'} */}
                            {props.nextPassword ? props.nextPassword : '...'}
                        </h2>

                    </Row>
                </Col>
            </Row>
            <Row style={{ flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                <AlertMessage message={message} setMessage={setMessage}></AlertMessage>
            </Row>

        </Container>


    )
}