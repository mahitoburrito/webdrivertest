async function requestINPMetrics(page, dict) {
    var INP = 0;
    await page.exposeFunction('updateINP', (metric) => {INP = metric;console.log("updated value inp^");dict.inp=metric});
    await page.evaluate(() => {
        const observer = new PerformanceObserver((list) => {
            var inp = -1;
            console.log(list);
            list.getEntries().forEach((entry) => {
                if (!entry.interactionId) {
                    return;
                }
                if (entry.duration > inp) {
                    console.log(inp);
                    console.log('INP UPDATED');
                    updateINP(inp);
                }
            })
        });
        observer.observe({type: "event", buffered: true, durationThreshold: 0});
    });
}

export default requestINPMetrics