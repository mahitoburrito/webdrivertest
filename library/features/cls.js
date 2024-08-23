async function requestCLSMetrics(page, dic, type) {
    var CLS = 0;
    var updateComplete = false;

    await page.exposeFunction('updateCLS', (metric) => {
        CLS = metric;
        console.log(`Updated ${type} CLS Value: ${metric}`);
        updateComplete = true;
        dict.cls = metric;
    });

    await page.evaluate(() => {
        //check for if observer has already been instatiated
        const observer = new PerformanceObserver((list) => {
            var cls = 0;
            let perfEntries = list.getEntries();
            perfEntries.forEach((entry) => {
                if (!entry.hadRecentInput) {
                    cls += entry.value;
                }
            });
            updateCLS(cls);
        });
        observer.observe({type: "layout-shift", buffered: true});
    });
}

export default requestCLSMetrics