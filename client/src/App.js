import './App.css';
import WebSocketConnection from './WebSocket/WebSocket';

const App = () => {
  const onClick = () => {
    if (document.wss) {
      document.wss.send(JSON.stringify({ getLogs: true }));
    }
  };

  return (
    <div className='container'>
      <div className='message-box'>
        <button className='btn' onClick={onClick}>
          Get Logs
        </button>
        <WebSocketConnection />
      </div>
    </div>
  );
};

export default App;
