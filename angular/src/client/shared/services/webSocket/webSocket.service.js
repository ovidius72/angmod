function WebSocketFactory($rootScope, AppSettings, LocaleFactory, FormatsFactory, $websocket) {
  "ngInject";
  let factory = {};
  let settings = AppSettings;
  let locale = LocaleFactory;
  let formats = FormatsFactory;

  factory.name = 'WebSocket';

  // let protocol = AppSettings.web_socket.protocol;
  // let host = AppSettings.web_socket.host;
  // let port = AppSettings.web_socket.port;
  // let address = protocol + host + ':' + port;
  // var ws = $websocket(address);


  // ws.onMessage((message) => {
  //   "use strict";
  //   }
  // });


  return factory;
}

export default WebSocketFactory;
