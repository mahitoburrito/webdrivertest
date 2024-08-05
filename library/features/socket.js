import WebSocket from 'ws';
import SEND from './SEND.js';

async function wsConnection(browser) {
    const wsNormal = new WebSocket(browser.wsEndpoint(), {perMessageDeflate: false});
    await new Promise(resolve => wsNormal.once('open', resolve));
    console.log('Acquiring targets...');
    const targetList = await SEND(wsNormal, {
    id: 1,
    method: 'Target.getTargets',
    });
    // Ensure we are grabbing the right page here
    console.log('Attaching to page targets...');
    const targetDetails = await SEND(wsNormal, {
    id: 2,
    method: 'Target.attachToTarget',
    params: {
        targetId: targetList.result.targetInfos[0].targetId, 
        flatten: true
    }
    });

    // Grab session ID
    const sessionID = await targetDetails.result.sessionId;
    await SEND(wsNormal, {
    sessionId: sessionID,
    id: 1, 
    method: 'Page.navigate',
    params: {
        url: URL,
    },
    });
    
    await SEND(wsNormal, {
    sessionId: sessionID,
    id: 2, 
    method: 'Performance.enable',
    });

    const perfResults = (await SEND(wsNormal, {
    sessionId: sessionID,
    id: 3,
    method: 'Performance.getMetrics',
    })).result;
    console.log('Performance metrics using DevTools Protocol');
    return perfResults;
}

export default wsConnection