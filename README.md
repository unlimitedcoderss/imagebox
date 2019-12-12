![ImageBox](http://blagojcetaleski.com/baleee/imgboxjs.png)

# @unlimited-coders/imagebox

[![npm (scoped)](https://img.shields.io/npm/v/@unlimited-coders/imagebox.svg)](https://www.npmjs.com/package/@unlimited-coders/imagebox)
[![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/@unlimited-coders/imagebox.svg)](https://www.npmjs.com/package/@unlimited-coders/imagebox)

An npm package that sets a beautified view of images and slide show with multiple options

## Install

```
$ npm install @unlimited-coders/imagebox
```

## Usage

```js
const imageBox = require("@unlimited-coders/imagebox");

imageBox({
   option1: value1,
   option2: value2
});

imageBox("options");
// => Uncaught TypeError: The 'options' parameter has to be of type object.
//    at imageBox (<anonymous>:2:41)
//    at <anonymous>:1:1
```
