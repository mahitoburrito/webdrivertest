function SEND(ws, command) {
    ws.send(JSON.stringify(command));
    return new Promise(resolve => {
      ws.on('message', function(text) {
        const response = JSON.parse(text);
        if (response.id === command.id) {
          resolve(response);
        }
      });
    });
  }
// 
export default SEND