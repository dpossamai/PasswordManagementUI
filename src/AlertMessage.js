import React from 'react';
import { Alert } from 'react-bootstrap';


export default function AlertMessage(props) {

  if (props.message.show) {
    return (
      <Alert variant={props.message.type} style={{ marginTop: 40 }} onClose={() => props.setMessage(false)} dismissible>
        <Alert.Heading>{props.message.text}</Alert.Heading>
      </Alert>
    );
  }
  return null;
}