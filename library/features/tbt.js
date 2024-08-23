async function requestTBTMetrics(page, dict, type) {
    var TBT = 0;

    await page.exposeFunction('updateTBT', (metric) => {
        TBT = metric;
        console.log(`Updated ${type} TBT Value: ${metric}`);
        dict.tbt=metric;
    });

    await page.evaluate(() => {
        const observer = new PerformanceObserver((list) => {
            var tbt = 0;
            let perfEntries = list.getEntries();
            perfEntries.forEach((entry) => {
                tbt += entry.duration - 50;
            });
            updateTBT(tbt);
        });
        observer.observe({type: "longtask", buffered: true});
    });
}

export default requestTBTMetrics