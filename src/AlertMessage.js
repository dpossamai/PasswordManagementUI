import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {Alert } from 'react-bootstrap';


export default function AlertMessage(props) {
    // const [show, setShow] = useState(props.show);
  
    if (props.message.show) {
      return (
        <Alert variant={props.message.type} style={{marginTop: 40}} onClose={() => props.setMessage(false)} dismissible>
          <Alert.Heading>{props.message.text}</Alert.Heading>
          {/* <p>
            Change this and that and try again. Duis mollis, est non commodo
            luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
            Cras mattis consectetur purus sit amet fermentum.
          </p> */}
        </Alert>
      );
    }
    return null;
  }