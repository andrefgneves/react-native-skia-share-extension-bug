# @shopify/react-native-skia iOS Share Extension Issue Reproduction

This repository contains a minimal reproduction of an issue with [@shopify/react-native-skia](https://github.com/Shopify/react-native-skia) where it fails to render within the context of an iOS share extension. It was bootstrapped with `create-expo-app` and makes use of the [expo-share-extension](https://github.com/MaxAst/expo-share-extension) plugin to create a share extension target.

Issue reported [here](https://github.com/Shopify/react-native-skia/issues/2686).

## Problem

When attempting to use `@shopify/react-native-skia` components inside an iOS share extension, the Skia elements do not render. This issue does not occur in the main app, only in the share extension context.

## Reproduction steps

1. Clone this repository
2. Install dependencies: `npm install`
3. Run the iOS app: `npm run ios`.  
   **Note:** Because iOS share extensions are not supported by Expo Go, this will first run `expo prebuild --clean` to ensure the app is installed into the simulator/device, instead of running in the Expo Go app.
4. Once the app starts, switch to some other app that allows sharing a URL (Safari, for example). Share the URL with the app. You should see a "skia-share-extension-bug" app in the share sheet, but if not, tap "More" and it should be there. Once you tap it, you should see a new modal screen fully white and no Skia elements rendered. The code that render the Skia elements (a simple RoundedRect) within the share extension is in [index.share.js](./index.share.js).

## Potential fix

I debugged this a bit and ended up in `RNSkMetalCanvasProvider.mm` where a check exists that will pause rendering if the app is in the background. The check as it is now will also resolve to true if the app is in a share extension context. Perhaps there's a better way to do it, but after some digging I [found](https://developer.apple.com/library/archive/documentation/General/Conceptual/ExtensibilityPG/ExtensionCreation.html) that we can know that the execution context is an app extension if the bundle path has a `.appex` suffix, so I [patched](./patches/@shopify+react-native-skia+1.2.3.patch) Skia locally to check for that and it seems to fix the issue.

To try the fix, run `npm run patch-skia` to apply the patch (`npm run unpatch-skia` to undo it), and then `npm run ios`.

## Environment

- @shopify/react-native-skia version: 1.2.3
- react-native version: 0.74.5
- expo version: 51.0.37
- expo-share-extension version: 1.10.4
- iOS version: 18.1
- Xcode version: 16.1

## Expected behavior

Skia components should render correctly within the iOS share extension, just as they do in the main app.

## Actual behavior

Skia components fail to render when used within the iOS share extension.
