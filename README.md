![ImageBox](http://blagojcetaleski.com/baleee/image-box.png)

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

imagebox("So much space!");
//=> "So much space!"

imagebox(1337);
//=> Uncaught TypeError: ImageBox wants a string!
//    at imageBox (<anonymous>:2:41)
//    at <anonymous>:1:1
```
