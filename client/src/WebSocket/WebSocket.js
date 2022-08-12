import { useEffect, useState } from 'react';
import { startConnection } from './WebSocket.services';

const WebSocketConnection = () => {
  const [wssMessage, getMessage] = useState();

  useEffect(() => {
    if (!document.wss) {
      startConnection({ getMessage });
    }

    return () => {
      if (document.wss) {
        document.wss.close();
      }
    };
  }, []);

  return (
    <div>
      <h2>WSS Message:</h2>
      <p className='wss-message'>{JSON.stringify(wssMessage)}</p>
    </div>
  );
};

export default WebSocketConnection;
