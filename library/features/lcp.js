async function requestLCPMetrics(page, dict) {
    var LCP = 0;
    await page.exposeFunction('updateLCP', (metric) => {
        LCP = metric;
        console.log("updated value lcp^");
        dict.lcp=metric;
    });
    
    await page.evaluate(() => {
        const observer = new PerformanceObserver((list) => {
            let perfEntries = list.getEntries();
            let currEntry = perfEntries[perfEntries.length - 1];
            console.log(currEntry);
            updateLCP(currEntry.startTime);
        });
        observer.observe({type: "largest-contentful-paint", buffered: true});
    });
}

export default requestLCPMetrics