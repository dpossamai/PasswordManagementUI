import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import AlertMessage from './AlertMessage';
import api from './api/api';
import { logout } from './security/Session';

export default function Manager(props) {


    const [message, setMessage] = useState({
        show: false, text: '', type: ''
    });

    const callNextPassword = () => {
        api.get("/password/next").then(res => {
            console.log("Success!");
            console.log(res.data);
            props.setNextPassword(res.data);
            if(!res.data ||  res.data === ''){
                setMessage({ text: 'Não há senhas na fila', show: true, type: 'dark' });
            }else{
                setMessage({ text: 'Operação realizada com sucesso', show: true, type: 'success' });
            }
            
        }
        ).catch(e => {
            if(e.response && e.response.status == 403){
                setMessage({ text: 'Sessão expirada!', show: true, type: 'danger' });
                logout();
                setTimeout(() => {
                    window.location.replace('http://localhost:3000/login');
                }, 2000);
            }else{
                setMessage({ text: 'Problema ao se conectar com o servidor. Tente novamente mais tarde', show: true, type: 'danger' });
            }
        });
    }

    const resetPasswords = () => {
        api.delete("/password/reset").then(res => {
            console.log("Success!");
            console.log(res.data);
            props.setNextPassword(null);
            setMessage({ text: 'Senhas resetadas', show: true, type: 'success' });
            
        }
        ).catch(e => {
            if(e.response && e.response.status == 403){
                setMessage({ text: 'Sessão expirada!', show: true, type: 'danger' });
                logout();
                setTimeout(() => {
                    window.location.replace('http://localhost:3000/login');
                }, 2000);
            }else{
                setMessage({ text: 'Problema ao se conectar com o servidor. Tente novamente mais tarde', show: true, type: 'danger' });
            }
        });
    }


    return (
        <Container>
            <Row style={{ flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center', margin: 30 }}>
                <h2 size="lg" type="text" style={{ textAlign: 'center', alignSelf: 'center', fontSize: 50 }}>Bem Vindo(a) Gerente!</h2>
            </Row>
            <Row>
                <Col>
                    <Row style={{ flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>

                        <h2 size="lg" type="text" style={{ textAlign: 'center', alignSelf: 'center', fontSize: 50 }}>Requisitar senha</h2>
                    </Row>
                    <Row style={{ flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                        <Button variant="primary" type="submit"
                            style={{ height: 200, width: 200, marginRight: 10 }}
                            onClick={callNextPassword}
                        >
                            Chamar Senha
                        </Button>

                      <Button variant="secondary" type="submit"
                            style={{ height: 200, width: 200, marginRight: 10 }}
                            onClick={resetPasswords}
                        >
                            Resetar Senhas
                        </Button>  
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