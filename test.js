import WebSocket from 'ws';
import puppeteer from 'puppeteer';

function SEND(ws, command) {
  ws.send(JSON.stringify(command));
  return new Promise(resolve => {
    ws.on('message', function(text) {
      const response = JSON.parse(text);
      if (response.id === command.id) {
        //ws.removeListener('message', arguments.callee);
        resolve(response);
      }
    });
  });
}

(async () => {
  // Puppeteer launches browser with a --remote-debugging-port=0 flag,
  // parses Remote Debugging URL from Chromium's STDOUT and exposes
  // it as |browser.wsEndpoint()|.
  const browser = await puppeteer.launch({
    product: 'chrome',
    headless: false
  });

  // Create a websocket to issue CDP commands.
  const ws = new WebSocket(browser.wsEndpoint(), {perMessageDeflate: false});
  await new Promise(resolve => ws.once('open', resolve));
  console.log('connected!');

  //ws.on('message', msg => {const obj = JSON.parse(msg.toString()); console.log(obj);});

  console.log('Sending Target.setDiscoverTargets');
  const targetList = await SEND(ws, {
    id: 1,
    method: 'Target.getTargets',
  });
  await console.log(targetList.result.targetInfos[0]);
  const targetDetails = await SEND(ws, {
    id: 2,
    method: 'Target.attachToTarget',
    params: {
      targetId: targetList.result.targetInfos[0].targetId, 
      flatten: true
    }
  });
  const sessionID = await targetDetails.result.sessionId;
  await console.log(sessionID);
  await SEND(ws, {
    sessionId: sessionID,
    id: 1, // Note that IDs are independent between sessions.
    method: 'Page.navigate',
    params: {
      url: 'https://pptr.dev',
    },
  });
  await SEND(ws, {
    sessionId: sessionID,
    id: 2, // Note that IDs are independent between sessions.
    method: 'Performance.enable',
  });
  const perfResults = (await SEND(ws, {
    sessionId: sessionID,
    id: 2, // Note that IDs are independent between sessions.
    method: 'Performance.getMetrics',
  })).result;
  console.log(perfResults);
})();