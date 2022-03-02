import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Lobby from './components/Lobby';
import Chat from './components/Chat';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';
import { useState } from 'react';

const App = () => {

  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);

  const joinRoom = async (user, room) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:44365/chat", {
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets
        })
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReciveMessage", (user, message) => {
        setMessages(messages => [...messages, { user, message }]);
      });
      await connection.start();
      await connection.invoke("JoinRoom", { user, room });
      setConnection(connection);
    }
    catch (e) {
      console.log(e);
    }
  }

  return <div className='app'>
    <h2>MyChat</h2>
    <hr className='line' />
    {!connection 
      ? <Lobby joinRoom={joinRoom} />
      : <Chat messages={messages} />}
  </div>
}

export default App;
