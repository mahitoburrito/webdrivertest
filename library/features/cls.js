async function requestCLSMetrics(page, dict) {
    var CLS = 0;
    var defaultCLS = CLS;
    var updateComplete = false;
    
    await page.exposeFunction('updateCLS', (metric) => {
        CLS = metric;
        console.log("updated value cls^");
        updateComplete=true;
        dict.cls=metric;
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
            //let currEntry = perfEntries[perfEntries.length - 1];
            //print(currEntry);
            //console.log(cls) 
            //print(cls);
            updateCLS(cls);
        });
        observer.observe({type: "layout-shift", buffered: true});
        //print("script ran for CLS");
    });
    // have a return statement that only returns if CLS has been updated, else have a 
    // timer to return only if its been updated or its been 2 seconds
    
    /* async function checkVarChange() {
        if (CLS === defaultCLS) {
            setTimeout(checkVarChange, 50);
            return 'goofy';
        }
        console.log("finished updating");
        return CLS;
    }
    console.log(await checkVarChange().then().then())
    return 5104918; */
    //return await checkVarChange();
    //pass in a immutable dict so that we can update using the expose function
}

export default requestCLSMetrics