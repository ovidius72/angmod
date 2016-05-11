import WebSocketFactory from './webSocket.service';

let WebSocket = angular.module('app.shared.services.websocket',
  [
    // 'ngWebSocket',
  ])
  .factory('WebSocketFactory', WebSocketFactory);

export default WebSocket;
