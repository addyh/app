# Pet Adoption ReactNative App

## Table of Contents
* [Preview](#preview)
  * [Android](#android)
  * [iPhone](#iphone)
* [SETUP](#setup)
  * [Config](#config)
  * [Install](#install)
  * [Build](#build)

## Preview

### Android
[Download on Google Play](https://play.google.com/store/apps/details?id=com.addisonhatcher.pinder)

<img src="./images/screenshot1.jpg" width="210" /> <img src="./images/screenshot2.jpg" width="210" /> <img src="./images/screenshot3.jpg" width="210" /> <img src="./images/screenshot4.jpg" width="210" />

### iPhone
<img src="./images/screenshot1-iphone.png" width="210" /> <img src="./images/screenshot2-iphone.png" width="210" /> <img src="./images/screenshot3-iphone.png" width="210" /> <img src="./images/screenshot4-iphone.png" width="210" />

# SETUP

## Config
First of all, before anything, please note that the URIs to `pets.json` and `settings.json` are set in:
```
/ API_CONFIG.json
```
## Install
```
git clone https://github.com/addyh/pinder.git
cd pinder
npm install
```

## Build

* #### With React-Native-cli  `npm install -g react-native-cli`
  * #### For Windows / Android dev `react-native run-android --variant=release`
  * #### For MacOS / iPhone dev `react-enative run-ios --configuration Release`

* ### With Android Studio
Start the react native Metro server
`react-native start`
Make sure an Android device is connected or the Android emulator is running, then press the green "Run" (play button) to build and run in Android Studio.

* ### With MacOS, XCode
Open the iOS project `ios/pinder.xcodeproj` with Xcode. Then press the green "Run" (play button) to build and run in Xcode.

* ### Build with gradle
`cd android && ./gradlew assembleRelease`
`cd android && gradlew.bat assembleRelease` on Windows
