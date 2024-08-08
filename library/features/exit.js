function exit(normalMetricsDict, extensionMetricsDict, metricToPrint, options) {
    console.log("\nFinal Report");
    console.log(`\nWeb Vital Metrics (Normal)`);
    for (let key in options) {
        if (metricToPrint[key] != undefined && options[key] == true) {
            console.log(`${metricToPrint[key]}${normalMetricsDict[key]}`)
        }
    }

    console.log("\n------------------------");
    console.log(`\nWeb Vital Metrics (Extension)`);

    for (let key in options) {
        if (metricToPrint[key] != undefined && options[key] == true) {
            console.log(`${metricToPrint[key]}${extensionMetricsDict[key]}`)
        }
    }
}

export default exit