import WebSocket from 'ws';
import puppeteer from 'puppeteer';
//import SEND from './SEND';

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
  // Launch a headful browser so that we can see the page navigating.
  const browser = await puppeteer.launch({headless: false});

  // Create a websocket to issue CDP commands.
  const ws = new WebSocket(browser.wsEndpoint(), {perMessageDeflate: false});
  await new Promise(resolve => ws.once('open', resolve));

  // Get list of all targets and find a "page" target.
  const targetsResponse = await SEND(ws, {
    id: 1,
    method: 'Target.getTargets',
  });
  const pageTarget = targetsResponse.result.targetInfos.find(info => info.type === 'page');

  // Attach to the page target.
  const sessionId = (await SEND(ws, {
    id: 2,
    method: 'Target.attachToTarget',
    params: {
      targetId: pageTarget.targetId,
      flatten: true,
    },
  })).result.sessionId;

  // Navigate the page using the session.
  await SEND(ws, {
    sessionId,
    id: 1, // Note that IDs are independent between sessions.
    method: 'Page.navigate',
    params: {
      url: 'https://pptr.dev',
    },
  });
})();