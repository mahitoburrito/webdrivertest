function exit(normalMetricsDict, extensionMetricsDict, metricToPrint, options) {
    //give some threshold value to detect, maybe percentage?
    // ACCOUNT for EXTENSION ONLY MODE
    console.log("\nFinal Report");
    console.log(`\nWeb Vital Metrics (Normal)`);
    if (!options.extensionOnly) {
        for (let key in options) {
            if (metricToPrint[key] != undefined && options[key] == true) {
                console.log(`${metricToPrint[key]}${normalMetricsDict[key]}`)
            }
        }
    }


    console.log("\n------------------------");
    console.log(`\nWeb Vital Metrics (Extension)`);

    for (let key in options) {
        if (metricToPrint[key] != undefined && options[key] == true) {
            console.log(`${metricToPrint[key]}${extensionMetricsDict[key]}`)
        }
    }
    console.log("\n------------------------");
    let perfPercentage;
    for (let key in options) {
        if (metricToPrint[key] != undefined && options[key] == true && !options.extensionOnly) {
            if (extensionMetricsDict[key] > normalMetricsDict[key]) {
                perfPercentage = 100 * (extensionMetricsDict[key] - normalMetricsDict[key]) / normalMetricsDict[key]
                console.log(`Extension slower by ${perfPercentage.toFixed(2)}% for ${key.toUpperCase()}`)
            } else if (extensionMetricsDict[key] < normalMetricsDict[key]) {
                perfPercentage = 100 * (normalMetricsDict[key] - extensionMetricsDict[key]) / extensionMetricsDict[key]
                console.log(`Normal is slower by ${perfPercentage.toFixed(2)}% for ${key.toUpperCase()}`)
            } else {
                console.log(`${key.toUpperCase()} is the same for both.`)
            }
        }
    }

}

export default exit