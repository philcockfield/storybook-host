import * as React from 'react';
import { R, Radium, css, NumberOrString, color } from '../common';
import { AlignEdge } from '../common/alignment';
import AlignmentContainer from './AlignmentContainer';
import CropMarks from './CropMarks';
import MobXDevTools from 'mobx-react-devtools';

const RED = 'rgba(255, 0, 0, 0.1)';

export interface IHostProps {
  title?: string;
  hr?: boolean;
  padding?: NumberOrString | Array<number>;
  align?: AlignEdge;
  width?: NumberOrString;
  height?: NumberOrString;
  background?: string | number | boolean;
  backdrop?: string | number | boolean;
  cropMarks?: boolean;
  border?: string | number | boolean; // Number between -1 (black) and 1 (white).
  styles?: any; // NB: For inserting global <styles>.
}

export interface IComponentHostProps {
  story: Function;
}




/**
 * A host container for components under test.
 */
const ComponentHost = Radium((props: IComponentHostProps & IHostProps) => {
  let {
    story,
    title,
    align,
    width,
    height,
    padding = 50,
    background,
    backdrop = 'white',
    hr,
    cropMarks = true,
    border = 0,
  } = props;

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

  const styles = css({
    base: {
      Absolute: 0,
      display: 'flex',
      flexDirection: 'column',
      background: backdropColor.toRgbString(),
    },
    header: {
      borderBottom: hr && `solid 1px ${cropMarkColor}`,
      paddingTop: 2,
      paddingBottom: hr && 15,
      marginLeft: 15,
      marginTop: 15,
      marginRight: 15,
    },
    h2: {
      fontWeight: 200,
      fontSize: 20,
      padding: 0,
      margin: 0,
      color: titleColor,
    },
    body: {
      boxSizing: 'border-box',
      position: 'relative',
      flex: 1,
      margin: formatMarginPadding(padding),
    },
  });


  return (
    <div style={styles.base}>
      {title &&
        <div style={styles.header}>
          <h2 style={styles.h2}>{title}</h2>
        </div>
      }
      {props.styles}
      <div style={styles.body}>
        <AlignmentContainer align={align}>
          <CropMarks
            width={width}
            height={height}
            background={componentBackground as string}
            cropMarkColor={cropMarkColor}
            cropMarksVisible={cropMarks}
            border={componentBorder}>
            {story()}
          </CropMarks>
        </AlignmentContainer>
      </div>
      <MobXDevTools position={{ bottom: -1, right: -1 }} />
    </div>
  );
});
export default ComponentHost;



function formatColor(value?: string | number | boolean): string | void {
  if (value === undefined) { return; }
  if (R.is(Number, value)) { return color.toGrayHex(value as number); }
  if (value === true) { return RED; }
  return value as string;
}


function isDark(color: tinycolorInstance): boolean {
  return color.getAlpha() < 0.4
    ? false
    : color.getBrightness() < 130;
}


function formatMarginPadding(value: NumberOrString | Array<number>): NumberOrString {
  if (R.is(Array, value)) {
    return (value as Array<number>)
      .slice(0, 4)
      .map(n => `${n}px`)
      .join(' ');
  }
  return value as NumberOrString;
}
