async function requestLCPMetrics(page, dict) {
    var LCP = 0;
    await page.exposeFunction('updateLCP', (metric) => {LCP = metric;console.log("updated value lcp^"); dict.lcp=metric;});
    await page.evaluate(() => {
        const observer = new PerformanceObserver((list) => {
            let perfEntries = list.getEntries();
            let currEntry = perfEntries[perfEntries.length - 1];
            console.log(currEntry);
            //print(currEntry.startTime);
            updateLCP(currEntry.startTime);
        });
        observer.observe({type: "largest-contentful-paint", buffered: true});
        //print("script ran for NEW LCP");
    });
}

export default requestLCPMetrics