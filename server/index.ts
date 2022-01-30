import { createServer } from 'http';
import { Server } from '@colyseus/core';
import { WebSocketTransport } from '@colyseus/ws-transport';
import { BaseRoom } from './rooms';
const PORT = 2022;

const server = createServer();

const gameServer = new Server({
  transport: new WebSocketTransport({
    server,
  }),
});

gameServer.define('base', BaseRoom);

gameServer.listen(PORT).then(() => {
  console.log(`Game server listening to port ${PORT}`);
});
