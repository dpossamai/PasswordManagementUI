import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SockJsClient from 'react-stomp';
import './App.css';
import Client from './Client';
import Login from './login/Login';
import Manager from './Manager';
import { getSession } from './security/Session';

function App() {
  const [nextPassword, setNextPassword] = useState('');

  let onConnected = () => {
    console.log("Connected!!")
  }

  let onMessageReceived = (msg) => {
    setNextPassword(msg.message);
  }

  // useEffect(() => {
  //   console.log("SERVICE: ")
  //   console.log(messageService);
  //   const subscription = messageService.getMessage().subscribe(message => {
  //     console.log("RECEBEU MESSAGE: " + message.text)
  //     if (message) {
  //       // add message to local state if not empty
  //       setNextPassword(message.text);
  //     } else {
  //       // clear messages when empty message received
  //       setNextPassword('');
  //     }
  //   });
  //   return () => {
  //     console.log("UNSUBSCRIBE!");
  //     subscription.unsubscribe();
  //   }
  // }, [])


  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/manager" >
          <Manager setNextPassword={setNextPassword} nextPassword={nextPassword} />
        </PrivateRoute>
        <Route path="/" component={Client} >
          <Client nextPassword={nextPassword} />
        </Route>
      </Switch>
      <SockJsClient
        url={"http://localhost:8080/ws-message"}
        topics={['/topic/message']}
        onConnect={onConnected}
        onDisconnect={console.log("Disconnected!")}
        onMessage={msg => onMessageReceived(msg)}
        debug={true}
      />
    </Router>
  );
}

function PrivateRoute({ children, ...rest }) {
  let session = getSession();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        session ? (
          children
        ) : (
          <Login />
        )
      }
    />
  );
}

// function RedirectPage() {
//   useEffect(() => {
//     window.location.replace('http://localhost:8080');
//   });

//   return (
//     <div>Redirecionando...</div>
//   );

// }

export default App;
