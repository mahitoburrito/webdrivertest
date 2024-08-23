# Extension Performance Testing Tool
This is a CLI tool that allows extension developers to compare the effects of an extension on the loading of a website based on the Core Web Vitals and other relevant metrics. This tool will help extension developers get a better understanding of how their extension affects user experience on specific websites.

# Getting Started
1. Install node.js and NPM: https://nodejs.org
2. Clone this repository
3. Run `npm install` at the root of this repository

# Usage/Options
Type `perf` into your terminal and then choose from the following flags
- '-e, --extension `<filepath>`' --> Extension Filepath, Conduct a test for the specified extension filepath
- '-u, --url `<url>`' --> URL, Specify a URL to be tested
- '-l, --lcp' --> Largest Contentful Paint Toggle, Start tracking LCP
- '-c, --cls' --> Cumulative Layout Shift Toggle, Start tracking CLS
- '-i, --inp' --> Interaction to Next Paint Toggle, Start tracking INP
- '-t, --tbt' --> Total Blocking Time Toggle, Start tracking TBT
- '-r, --resources' --> Computer Resources (CPU + Memory) Toggle, Start tracking computer resources
- '-a, --all-metrics' --> All Metrics Toggle, Start tracking all available metrics
- '-o, --extension-only' --> Extension Only Mode, Only test browser with extension enabled
- '-p, --profile `<filepath>`' --> Chrome Profile Path, Initiate browser with specified Chrome Profile
- '-h, --help' --> Help, Access help for tool

# Examples

Specifying Inputs (filepath, url, etc.):
1. Type the input directly after abbreviated flag: `perf -e /path/to/extension`
2. Type the input directly after complete flag: `perf -extension /path/to/extension`
3. Connect input to complete flag: `perf --extension=/path/to/extension`

Sample Usage:
1. Testing for all available metrics: `perf --extension=/path/to/extension --url=https://www.google.com -a`
2. Testing for some metrics: `perf --extension=/path/to/extension --url=https://www.google.com -l -c`
3. Testing with a Chrome profile: `perf --extension=/path/to/extension --url=https://www.google.com -a --profile=/path/to/profile`
4. Testing only with an extension: `perf --extension=/path/to/extension --url=https://www.google.com -a -o`

# Next Steps

Possible Additional Features
1. Introduce support for installing extensions via IDs using policy files.
2. Support a wider variety of extension metrics beyond just the core few.
3. Provide real-time CPU & Memory Usage information (partially completed as of now).