const WebSocket = require('ws');
const Log = require('../models/Log');

const connectWSS = (server, port) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws, req) => {
    ws.on('message', async (message) => {
      const data = JSON.parse(message);
      const { getLogs } = data;
      if (getLogs) {
        const allLogs = await Log.find({}).sort({
          date: -1,
        });
        wss.clients.forEach((user) => {
          user.send(JSON.stringify(allLogs));
        });
      }
    });

    ws.on('close', async (code, reason) =>
      console.log('WebSocket user disconnected')
    );
  });

  console.log('WebSocket Server started ');
};

module.exports = connectWSS;
