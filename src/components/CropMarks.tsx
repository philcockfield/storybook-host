import * as React from 'react';
import { Radium, css } from '../common';
import CropMark from './CropMark';

export interface ICropMarksProps {
  width?: number | string;
  height?: number | string;
  background?: number | string;
  cropMarkColor?: string;
  cropMarksVisible?: boolean;
  border?: string;
  children?: any;
}


/**
 * Positions a set of crop-marks around it's contents.
 */
export const CropMarks = Radium(({

  width = 'auto',
  height = 'auto',
  background,
  cropMarkColor,
  cropMarksVisible = true,
  border,
  children,

}: ICropMarksProps) => {

  const styles = css({
    base: {
      position: 'relative',
      boxSizing: 'border-box',
      background,
      width,
      height,
      border,
    },
  });
  const props = {
    color: cropMarkColor,
  };

  if (cropMarksVisible) {
    return (
      <div style={styles.base}>
        {children}
        <CropMark { ...props } edge='topLeft' />
        <CropMark { ...props } edge='topRight' />
        <CropMark { ...props } edge='bottomLeft' />
        <CropMark { ...props } edge='bottomRight' />
      </div>
    );
  } else {
    return (
      <div style={styles.base}>
        {children}
      </div>
    );
  }

});
export default CropMarks;
