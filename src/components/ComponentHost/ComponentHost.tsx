import { React, R, css, color } from '../../common';
import { AlignEdge } from '../../common/alignment';
import { AlignmentContainer } from '../AlignmentContainer';
import { CropMarks } from '../CropMarks';

const RED = 'rgba(255, 0, 0, 0.1)';

export interface IHostProps {
  title?: string;
  hr?: boolean;
  padding?: number | string | number[];
  align?: AlignEdge;
  width?: number | string;
  height?: number | string;
  background?: string | number | boolean;
  backdrop?: string | number | boolean;
  cropMarks?: boolean;
  border?: string | number | boolean; // Number between -1 (black) and 1 (white).
  styles?: any; // NB: For inserting global <styles>.
  flex?: boolean;
}

export interface IComponentHostProps extends IHostProps {
  story: () => any;
}

/**
 * A host container for components under test.
 */
export const ComponentHost = (props: IComponentHostProps) => {
  const {
    story,
    title,
    align,
    width,
    height,
    padding = 50,
    background,
    backdrop = 'white',
    cropMarks = true,
    border = 0,
    flex,
  } = props;
  let { hr } = props;

  // Default values.
  hr = hr === false ? false : true;
  const componentBackground = formatColor(background);
  const backdropColor = color.create(formatColor(backdrop));
  const isBackdropDark = isDark(backdropColor);

  const cropMarkColor = isBackdropDark
    ? 'rgba(255, 255, 255, 0.3)'
    : 'rgba(0, 0, 0, 0.1)';

  const titleColor = isBackdropDark
    ? 'rgba(255, 255, 255, 0.7)'
    : 'rgba(0, 0, 0, 0.6)';

  let componentBorder = border as string;
  if (R.is(Number, border)) {
    componentBorder = `solid 1px ${color.toGrayAlpha(border as number)}`;
  }
  if (border === true) {
    componentBorder = `dashed 1px rgba(0, 0, 0, 0.2)`;
  }

  const styles = {
    base: css({
      Absolute: 0,
      display: 'flex',
      flexDirection: 'column',
      background: backdropColor.toRgbString(),
    }),
    normalizeText: css({
      // Copied in from `normalize.css` template.
      fontFamily: 'sans-serif' /* 1 */,
      lineHeight: 1.15 /* 2 */,
      msTextSizeAdjust: '100%' /* 3 */,
      WebkitTextSizeAdjust: '100%' /* 3 */,
    }),
    header: css({
      borderBottom: hr && `solid 1px ${cropMarkColor}`,
      paddingTop: 2,
      paddingBottom: hr && 15,
      marginLeft: 15,
      marginTop: 15,
      marginRight: 15,
    }),
    h2: css({
      fontWeight: 200,
      fontSize: 20,
      padding: 0,
      margin: 0,
      color: titleColor,
    }),
    body: css({
      boxSizing: 'border-box',
      position: 'relative',
      flex: 1,
      margin: formatMarginPadding(padding),
    }),
  };

  const flexStyle = {} as any;
  if (flex !== undefined) {
    flexStyle.display = 'flex';
  }

  return (
    <div {...css(styles.base, styles.normalizeText)}>
      {title && (
        <div {...styles.header}>
          <h2 {...styles.h2}>{title}</h2>
        </div>
      )}
      {props.styles}
      <div {...styles.body}>
        <AlignmentContainer align={align}>
          <CropMarks
            width={width}
            height={height}
            background={componentBackground as string}
            cropMarkColor={cropMarkColor}
            cropMarksVisible={cropMarks}
            border={componentBorder}
            style={flexStyle}
          >
            {story()}
          </CropMarks>
        </AlignmentContainer>
      </div>
    </div>
  );
};

/**
 * INTERNAL
 */
function formatColor(value?: string | number | boolean): string | void {
  if (value === undefined) {
    return;
  }
  if (R.is(Number, value)) {
    return color.toGrayHex(value as number);
  }
  if (value === true) {
    return RED;
  }
  return value as string;
}

function isDark(color: tinycolorInstance): boolean {
  return color.getAlpha() < 0.4 ? false : color.getBrightness() < 130;
}

function formatMarginPadding(
  value: number | string | number[],
): number | string {
  if (R.is(Array, value)) {
    return (value as number[])
      .slice(0, 4)
      .map(n => `${n}px`)
      .join(' ');
  }
  return value as number | string;
}
