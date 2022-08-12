export const startConnection = ({ getMessage }) => {
  let origin = `wss${window.origin.substring(window.origin.indexOf('://'))}`;

  if (window.origin.indexOf('localhost') >= 0) {
    origin = `ws://localhost:5000`;
  }

  const wss = new WebSocket(origin);
  wss.onopen = () => {
    console.log('WSS Connection is open');
  };
  wss.onmessage = (e) => {
    try {
      getMessage(JSON.parse(e.data));
    } catch (err) {
      console.log(err, 'error');
    }
  };

  wss.onclose = (e) => {
    if (!e.wasClean) {
      console.log(
        'ws closed by restarted server. Will reconnect through 10 sec'
      );
      setTimeout(() => {
        startConnection({ getMessage });
      }, 10000);
    }
    delete document.wss;
  };

  //Update wss for tracking
  document.wss = wss;

  return wss;
};
