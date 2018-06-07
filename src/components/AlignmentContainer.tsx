import { React, Radium, css } from '../common';
import { AlignEdge, edges } from '../common/alignment';

export interface IAlignmentContainerProps {
  children?: object;
  align?: AlignEdge;
}

/**
 * Flex-box container providing edge alignment of child content.
 */
export const AlignmentContainer = Radium(
  ({ children, align = 'center top' }: IAlignmentContainerProps) => {
    const { horizontal, vertical } = edges(align, 'center', 'top');
    let direction = '';
    let alignItems = '';
    let justifyContent = '';

    if (horizontal === 'left' && vertical === 'top') {
      direction = 'row';
      alignItems = 'flex-start';
    }

    if (horizontal === 'left' && vertical === 'middle') {
      direction = 'row';
      alignItems = 'center';
    }

    if (horizontal === 'left' && vertical === 'bottom') {
      direction = 'row';
      alignItems = 'flex-end';
    }

    if (horizontal === 'right' && vertical === 'top') {
      direction = 'column';
      alignItems = 'flex-end';
    }

    if (horizontal === 'right' && vertical === 'middle') {
      direction = 'row';
      alignItems = 'center';
      justifyContent = 'flex-end';
    }

    if (horizontal === 'right' && vertical === 'bottom') {
      direction = 'column-reverse';
      alignItems = 'flex-end';
    }

    if (horizontal === 'center' && vertical === 'top') {
      direction = 'column';
      alignItems = 'center';
    }

    if (horizontal === 'center' && vertical === 'middle') {
      direction = 'column';
      alignItems = 'center';
      justifyContent = 'center';
    }

    if (horizontal === 'center' && vertical === 'bottom') {
      direction = 'column-reverse';
      alignItems = 'center';
    }

    const styles = css({
      base: {
        alignItems,
        justifyContent,
        Absolute: 0,
        display: 'flex',
        flexDirection: direction,
      },
    });

    return <div style={styles.base}>{children}</div>;
  },
);
export default AlignmentContainer;
