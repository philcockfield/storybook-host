import { React, css } from '../common';

export interface ICropMarkProps {
  edge: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  offset: number;
  color: string;
  size: number;
}

/**
 * A single crop-mark within the <CropMarks>.
 */
export const CropMark = (props: ICropMarkProps) => {
  const { edge, offset = 5, color = 'rgba(0, 0, 0, 0.15)', size = 20 } = props;

  let base: any;
  let xAxis: any;
  let yAxis: any;

  switch (edge) {
    case 'topLeft':
      base = { Absolute: `-${size - 1} auto auto -${size - 1}` };
      xAxis = { Absolute: `null ${offset} 0 0` };
      yAxis = { Absolute: `0 0 ${offset} auto` };
      break;

    case 'topRight':
      base = { Absolute: `-${size - 1} -${size - 1} auto auto` };
      xAxis = { Absolute: `auto 0 0 ${offset}` };
      yAxis = { Absolute: `0 auto ${offset} 0` };
      break;

    case 'bottomLeft':
      base = { Absolute: `auto auto -${size - 1} -${size - 1}` };
      xAxis = { Absolute: `0 ${offset} auto 0` };
      yAxis = { Absolute: `${offset} 0 0 auto` };
      break;

    case 'bottomRight':
      base = { Absolute: `null -${size - 1} -${size - 1} auto` };
      xAxis = { Absolute: `0 0 auto ${offset}` };
      yAxis = { Absolute: `${offset} auto 0 0` };
      break;

    default: // Ignore.
  }

  base.width = size;
  base.height = size;
  xAxis.borderBottom = `solid 1px ${color}`;
  yAxis.borderRight = `solid 1px ${color}`;
  const styles = { base, xAxis, yAxis };

  let el: any;
  if (size > 0) {
    el = (
      <div {...css(styles.base)}>
        <div {...css(styles.xAxis)} />
        <div {...css(styles.yAxis)} />
      </div>
    );
  }
  return el;
};

export default CropMark;
