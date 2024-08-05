function report(options) {
    console.log(`Extension Filepath: ${options.extension}`);
    console.log(`Testing URL: ${options.url}`);
    console.log(`Tracking Resources: ${options.resources}`);
    console.log(`Tracking CLS: ${options.cls}`);
    console.log(`Tracking LCP: ${options.lcp}`);
    console.log(`Tracking TBT: ${options.tbt}`);
    console.log(`Tracking INP: ${options.inp}`);
}

export default report