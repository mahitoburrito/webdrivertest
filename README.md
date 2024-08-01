Description:
- CLI Tool that allows extension developer to compare the effects of a extension on the loading of a website based on the Core Web Vitals and other related metrics. 

Usage:
- Type perf into your terminal and then choose from the following flags
'-e' --> Conduct a test for the specified extension filepath
'-u' --> Specify a URL to be tested
'-l' --> Do not track Largest Contentful Paint
'-c' --> Do not track Cumulative Layout Shift
'-i' --> Do not track Interaction to Next Paint
'-t' --> Do not track Total Blocking Time
'-r' --> Do not track Computer Resources (CPU + Memory)