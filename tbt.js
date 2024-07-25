async function requestTBTMetrics(page, dict) {
    var TBT = 0;
    
    await page.exposeFunction('updateTBT', (metric) => {
        TBT = metric;
        console.log("updated value tbt^");
        dict.tbt=metric;
    });
    
    await page.evaluate(() => {
        const observer = new PerformanceObserver((list) => {
            var tbt = 0;
            let perfEntries = list.getEntries();
            perfEntries.forEach((entry) => {
                tbt += entry.duration - 50;
            });
            //print(tbt);
            updateTBT(tbt);
        });
        observer.observe({type: "longtask", buffered: true});
        //print("script ran for total blocking time");
    });
}

export default requestTBTMetrics