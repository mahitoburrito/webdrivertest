// Send a command over the WebSocket and return a promise
// that resolves with the command response.
/* module.exports = {
    SEND: function() {
        console.log("hello");
    }
}
 */
function SEND(ws, command) {
    ws.send(JSON.stringify(command));
    return new Promise(resolve => {
      ws.on('message', function(text) {
        const response = JSON.parse(text);
        if (response.id === command.id) {
          //ws.removeListener('message', arguments.callee); something to do with strict mode <-- look into
          resolve(response);
        }
      });
    });
  }
// 
export default SEND