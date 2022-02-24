import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Lobby from './components/Lobby';
import { HubConnectionBuilder, HubConnetionBuilder, LogLevel } from '@microsoft/signalr';
import { useState } from 'react';

const App = () => {

  const [connection, setConnection] = useState();

  const joinRoom = async (user, room) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:44365/chat")
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReciveMessage", (user, message) => {
        console.log('message: ', message);
      });
      await connection.start();
      await connection.invoke("JoinRoom", { user, room });
    }
    catch (e) {
      alert(e);
    }
  }

  return <div className='app'>
    <h2>MyChat</h2>
    <hr className='line' />

    <Lobby joinRoom={joinRoom} />
  </div>
}

export default App;
