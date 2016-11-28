# storybook-host
[![Build Status](https://travis-ci.org/philcockfield/storybook-host.svg?branch=master)](https://travis-ci.org/philcockfield/storybook-host)

A [React Storybook](https://getstorybook.io/) decorator with powerful display options for 
hosting, sizing and framing your components.




## Install

    npm install -D storybook-host

## Try in Storybook

    npm start

## Usage

```js
import { storiesOf } from '@kadira/storybook'
import { host } from 'storybook-host';
import { MyComponent } from './MyComponent'

storiesOf('helpers.storybook', module)
  .addDecorator(host({
    title: 'A host container for components under test.',
    align: 'center bottom',
    height: '80%',
    width: 400,
  }))
  .add('Component', () => <MyComponent/>);

```

![Screen Shot](https://cloud.githubusercontent.com/assets/185555/19583290/dc0041fc-9797-11e6-9893-62bb03822eca.png)




## Properties

```js
host({
  mobXDevTools: <boolean>,
  title: <string>,
  hr: <boolean>,
  align: <string>,
  height: <number | string>,
  width: <number | string>,
  background: <boolean | number | string>,
  backdrop: <boolean | number | string>,
  cropMarks: <boolean>,
  border: <boolean | number | string>,
  padding: <number | string>,
});
```
#### `mobXDevTools: boolean`
Flag indicating if the mobXDevTools at the bottom should be shown.  Default: `true`.

#### `title: string`
The title display that is displayed at the top of the window.
Use this to to name and provide a decription of the component under test.

#### `hr: boolean`
Flag indicating if the horizontal rule under the title should be shown.  Default: `true`.

#### `align: string [x y]`
A string indicating how to align the component within the host. The string takes to parts (`x` and `y`) 
seperated by a space. The order of horizontal vs. vertical does not matter, 
eg `top left` is the same as `left top`.

- Horizontal (X)
    - `left`
    - `center`
    - `right`
- Vertical (Y)
    - `top`
    - `middle`
    - `bottom`


#### `width: number | string | undefined`
The width to lock the component at, eg: `400` (number as pixels) or `400px` or `100%`.

#### `height: number | string | undefined`
The height to lock the component at, eg: `200` (number as pixels) or `200px` or `100%`.

#### `background: boolean | number | string`
The background color to draw behind the component.
- `true`: ruby red (eg. `rgba(255, 0, 0, 0.1)`).  Useful for quick visualization of component size.  
- `string`: A CSS background-color value.
- `number (-1:black..0..1:white)`

#### `backdrop: boolean | number | string`
The background color of the entire host panel. Same value types as `background`.

#### `cropMarks: boolean`
Flag indicating if the crop-marks should be visible. Default: `true`.

#### `border: string | number | boolean`
Optional border for the component.

#### `padding: number | string`
The padding of the host container.

