## Trading View JS

This repository is used with the purpose of bundling TradingView Advanced Charting Library to use with **Flutter In-app Webview**

#### Steps to update the charting library:

###### 1. Make some changes in typescript code

Update your new code in `src/tvchart.ts`

###### 2. Bundle it!

In the root project directory, run the command (Only support in MacOS, Linux):
`./clean-build.sh`

After the command executed successfully, you will get a folder which named `dist`, now copy all contents of this folder to the flutter app which using Flutter In-app Webview to develop Trading View Charting!
