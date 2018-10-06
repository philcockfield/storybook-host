import { React, css, GlamorValue } from '../../common';
import { CropMark } from './CropMark';

export interface ICropMarksProps {
  width?: number | string;
  height?: number | string;
  background?: number | string;
  cropMarkColor?: string;
  cropMarksVisible?: boolean;
  border?: string;
  children?: any;
  style?: GlamorValue;
}

/**
 * Positions a set of crop-marks around it's contents.
 */
export const CropMarks = (props: ICropMarksProps) => {
  const {
    width = 'auto',
    height = 'auto',
    background,
    cropMarkColor,
    cropMarksVisible = true,
    border,
    children,
  } = props;

  const styles = {
    base: css({
      position: 'relative',
      boxSizing: 'border-box',
      background,
      width,
      height,
      border,
    }),
  };

  const cropMarkProps = {
    color: cropMarkColor,
  };
  return (
    <div {...css(styles.base, props.style)}>
      {children}
      {cropMarksVisible && (
        <div>
          <CropMark {...cropMarkProps} edge='topLeft' />
          <CropMark {...cropMarkProps} edge='topRight' />
          <CropMark {...cropMarkProps} edge='bottomLeft' />
          <CropMark {...cropMarkProps} edge='bottomRight' />
        </div>
      )}
    </div>
  );
};
