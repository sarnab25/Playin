import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const WebSocket = require('ws');

export function videocallServer() {
  const wss = new WebSocket.Server({ port: 7030 });

  wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });

    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });

  console.log("WebSocket server running on port 7030");
}
