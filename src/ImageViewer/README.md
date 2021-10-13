# Image Viewer

A component for displaying multiple files and enabling `selection`. Completely generalized and customizable.

<p float="left">
  <img src="https://raw.githubusercontent.com/kartikeyvaish/React-Native-UI-Components/main/src/ImageViewer/config/screenshots/Screenshot_One.jpg" width="300" />
  <img src="https://raw.githubusercontent.com/kartikeyvaish/React-Native-UI-Components/main/src/ImageViewer/config/screenshots/Screenshot_Two.jpg" width="300" /> 
</p>

<img src="https://raw.githubusercontent.com/kartikeyvaish/React-Native-UI-Components/main/src/ImageViewer/config/screenshots/ScreenRecord_Demo.gif" width="300" />

## Usage

```javascript
<ImageViewer
  files={configs.ImageList}
  onBackButtonPress={() => navigation.goBack()}
  onDoneButtonPress={(data) => console.log(data)}
/>
```

## Parameters

| Parameter             | required | Default     | Description                                   |
| --------------------- | -------- | ----------- | --------------------------------------------- |
| files                 | NO       | []          | An array of files                             |
| onBackButtonPress     | NO       | null        | function to execute on backButton press       |
| onDoneButtonPress     | NO       | null        | function to execute on doneButton press       |
| backButtonColor       | NO       | null        | color of back button                          |
| backButtonComponent   | NO       | null        | custom component instead of backbutton        |
| backButtonIconName    | NO       | "arrowleft" | Icon Name for backbutton (family = AntDesign) |
| showBackButton        | NO       | true        | To show the `back` button or not              |
| doneButtonIconName    | NO       | "check"     | Icon Name for donebutton (family = AntDesign) |
| showDoneButton        | NO       | true        | To show the `done` button or not              |
| doneButtonComponent   | NO       | null        | Custom component instead of donebutton        |
| doneButtonColor       | NO       | null        | color of done button                          |
| doneButtonDisabled    | NO       | null        | doneButotn disability                         |
| customHeaderComponent | NO       | null        | custom component instead of donebutton        |
