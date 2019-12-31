![ImageBox](http://blagojcetaleski.com/baleee/imgboxjs.png)

# @unlimited-coders/imagebox

[![npm (scoped)](https://img.shields.io/npm/v/@unlimited-coders/imagebox.svg)](https://www.npmjs.com/package/@unlimited-coders/imagebox)
[![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/@unlimited-coders/imagebox.svg)](https://www.npmjs.com/package/@unlimited-coders/imagebox)

A lightweight plugin built with only Vanilla JavaScript, without any dependencies. 

Sets a beautified view of images and slide show with multiple options.

## Installation

### npm
```
$ npm install @unlimited-coders/imagebox
```

### Github

You can download the latest version of `imageBox` on [Github](https://github.com/unlimitedcoderss/imagebox)

## Usage

### HTML
```html
<div id="image-box"></div>
```

### JavaScript
```js
const imageBox = require("@unlimited-coders/imagebox");

imageBox({
   images: [
        'path/to/image-1',
        'path/to/image-2',
        'path/to/image-3',
        'path/to/image-4',
   ]
});
```

### Options

imageBox has a couple of options, including:

`images` : This option is mandatory and should be an array of image paths;

`imageBorders` : This option gives the freedom to the user to choose if they'd use borders on the photos. 
By default this option is set to `true`

`slideShow` : This option provides the slideShow functionality if it's set to `true` which is also its default value

`arrows` : This option is of type object and for now accepts only a property for the position of the arrows of the slider.
The possible values of the property `position` are:

- `middle` : the arrows are placed next to the image to its left and right side
- `down` : the arrows are placed next to the number of the image at the bottom, below the image

The default value of the `position` property is `middle`.
## Example

### HTML
```html
<div id="image-box"></div>
```

### JavaScript
```js
const imageBox = require("@unlimited-coders/imagebox");

imageBox({
   images: [
        'path/to/image-1',
        'path/to/image-2',
        'path/to/image-3',
        'path/to/image-4',
   ],
   imageBorders: false,
   arrows: {
       position: 'down'
   }
});
```

The example shown above will generate an imageBox with 4 images with the corresponding paths.
The images won't have borders and the arrows of the slider will be placed next to the number of the image
which is placed below the image.



