import * as R from 'ramda';
import { isBlank, isPlainObject, toNumber } from './util';


/**
 * Takes an image path and breaks it into it's components pieces
 * providing 1x/2x versions of the image.
 *
 * @param {string} path: the raw file path to evaluate.
 * @return {object}
 */
export const expandImagePath = (path: string) => {
  if (isBlank(path)) { throw new Error('Image path not specified.'); }

  // Extract paths and file-name.
  const index = R.lastIndexOf('/', path.split(''));
  const basePath = path.substr(0, index + 1);
  let fileName = path.substr(index + 1, path.length);
  const parts = fileName.split('.');
  if (parts.length < 2) {
    throw new Error(`An image must have a file extension. [path: ${path}]`);
  }
  fileName = parts[ 0 ];
  const extension = parts[ 1 ];

  // Finish up.
  return {
    basePath,
    fileName,
    extension,
    '1x': `${basePath}${fileName}.${extension}`,
    '2x': `${basePath}${fileName}@2x.${extension}`,
  };
};


export interface IImageOptions {
  width?: number;
  height?: number;
}


/**
 * Constructs a style object for an image.
 *
 *    For turning image files (PNG/JPG/SVG) into data-uri's see:
 *    https://github.com/webpack/url-loader
 *
 * @param {string} image1x: The normal image resolution (base64 encoded)
 * @param {string} image2x: The retina image resolution (base64 encoded)
 * @param {integer} width: Optional. The width of the image.
 * @param {integer} height: Optional. The height of the image.
 */
export const image = (
  image1x: string | undefined,
  image2x: string | undefined,
  options: IImageOptions = { width: 10, height: 10 }
) => {

  const { width, height } = options;

  // Prepare image based on current screen density.
  let img = (global as any).devicePixelRatio > 1 ? image2x : image1x;
  if (!img) { img = image1x; }
  if (!img) { throw new Error('Must have at least a 1x image.'); }

  // Finish up.
  return {
    backgroundImage: `url(${img})`,
    width,
    height,
    backgroundSize: `${width}px ${height}px`,
    backgroundRepeat: 'no-repeat',
  };
};



const mergeAndReplace = (key: string, value: any, target: any) => {
  Object.assign(target, value);
  delete target[ key ];
  return target;
};



const formatImage = (
  key: string,
  value: Array<string | number | undefined>,
  target: any
) => {
  // Wrangle parameters.
  let [ image1x, image2x, width, height ] = value;

  if (R.is(Number, image2x)) {
    height = width;
    width = image2x;
    image2x = undefined;
  }
  const options = {
    width: width as number,
    height: height as number,
  };
  const style = image(image1x as string, image2x as string, options);
  mergeAndReplace(key, style, target);
};




// ----------------------------------------------------------------------------



export const toPositionEdges = (
  key: string,
  value: any = undefined
): {
  position: string,
  top: number | void, right: number | void, bottom: number | void, left: number | void
} | void => {

  if (value === undefined || value === null) { return undefined; }
  if (R.is(String, value) && isBlank(value)) { return undefined; }
  if (R.is(Array, value) && value.length === 0) { return undefined; }
  if (!R.is(Array, value)) {
    value = value.toString().split(' ');
  }
  const edges = value.map((item: any) => toNumber(item));
  let top: number | void;
  let right: number | void;
  let bottom: number | void;
  let left: number | void;

  const getEdge = (index: number): number | void => {
    const edge = edges[ index ];
    if (edge === null || edge === 'null' || edge === '') { return undefined; }
    return edge;
  };

  switch (edges.length) {
    case 1:
      top = getEdge(0);
      bottom = getEdge(0);
      left = getEdge(0);
      right = getEdge(0);
      break;

    case 2:
      top = getEdge(0);
      bottom = getEdge(0);
      left = getEdge(1);
      right = getEdge(1);
      break;

    case 3:
      top = getEdge(0);
      left = getEdge(1);
      right = getEdge(1);
      bottom = getEdge(2);
      break;

    default:
      top = getEdge(0);
      right = getEdge(1);
      bottom = getEdge(2);
      left = getEdge(3);
  }

  if (top === undefined && right === undefined && bottom === undefined && left === undefined) {
    return undefined;
  }
  return {
    position: key.toLowerCase(),
    top, right, bottom, left,
  };
};


export const formatPositionEdges = (key: string, target: any) => {
  const styles = toPositionEdges(key, target[ key ]);
  mergeAndReplace(key, styles, target);
};


/**
 * AbsoluteCenter
 *      - x
 *      - y
 *      - xy
 */
const formatAbsoluteCenter = (key: string, value: string | boolean | number, target: any) => {
  if (value === true) { value = 'xy'; }
  if (value === false || value === undefined || value === null) { return; }
  const styles = {
    position: 'absolute',
    left: target.left,
    top: target.top,
    transform: '',
  };
  const stringValue = value.toString().trim().toLowerCase();
  if (stringValue.includes('x')) { styles.left = '50%'; }
  if (stringValue.includes('y')) { styles.top = '50%'; }
  let transform: string;
  switch (value) {
    case 'yx':
    case 'xy': transform = 'translate(-50%, -50%)'; break;
    case 'x': transform = 'translateX(-50%)'; break;
    case 'y': transform = 'translateY(-50%)'; break;
    default: throw new Error(`AbsoluteCenter value '${value}' not supported.`);
  }
  styles.transform = `${target.transform || ''} ${transform}`.trim();
  mergeAndReplace(key, styles, target);
};




const addVendorPrefix = (key: string, value: string, target: any) => {
  const capitalized = `${key.charAt(0).toUpperCase()}${key.slice(1)}`;
  const styles = {};
  styles[ key ] = value;
  styles[ `Webkit${capitalized}` ] = value;
  styles[ `Moz${capitalized}` ] = value;
  styles[ `ms${capitalized}` ] = value;
  Object.assign(target, styles);
};




// ----------------------------------------------------------------------------



/**
 * Helpers for constructing a CSS object.
 */
export const css: any = (styles: any = {}) => {
  Object.keys(styles).forEach(key => {
    const value = styles[ key ];
    if (R.isNil(value)) {
      delete styles[ key ];
    } else if (isPlainObject(value)) {
      styles[ key ] = css(value); // <== RECURSION.
    } else {
      switch (key) {
        case 'Image': formatImage(key, value, styles); break;
        case 'Absolute': formatPositionEdges(key, styles); break;
        case 'Fixed': formatPositionEdges(key, styles); break;
        case 'AbsoluteCenter': formatAbsoluteCenter(key, value, styles); break;
        case 'userSelect': addVendorPrefix(key, value, styles); break;
        default:
        // Ignore.
      }
    }
  });

  // Finish up.
  return styles;
};


// ----------------------------------------------------------------------------
css.image = image;
export default css;
