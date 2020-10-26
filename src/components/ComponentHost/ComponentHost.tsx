import { React, R, css, color, GlamorValue } from '../../common';
import { AlignEdge } from '../../common/alignment';
import { AlignmentContainer } from '../AlignmentContainer';
import { CropMarks } from '../CropMarks';
import { CSSProperties } from 'react';
import { StoryContext } from '@storybook/addons';

const RED = 'rgba(255, 0, 0, 0.1)';

type FlexConfig = {
  flexDirection?: CSSProperties['flexDirection'];
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
  flexWrap?: CSSProperties['flexWrap'];
  alignContent?: CSSProperties['alignContent'];
};

export interface IHostOptions {
  title?: string;
  hr?: boolean;
  padding?: number | string | number[];
  align?: AlignEdge;
  width?: number | string;
  height?: number | string;
  maxWidth?: number | string;
  background?: string | number | boolean;
  backdrop?: string | number | boolean;
  cropMarks?: boolean;
  border?: string | number | boolean; // Number between -1 (black) and 1 (white).
  styles?: any; // NB: For inserting global <styles>.
  flex?: boolean | FlexConfig;
}

export interface IComponentHostProps {
  story: (context: StoryContext) => any;
  context: StoryContext;
  options: IHostOptions;
  parameters: IHostOptions;
}

/**
 * A host container for components under test.
 */
export const ComponentHost = (props: IComponentHostProps) => {
  const combinedOptions = {
    ...props.options,
    ...props.parameters,
    flex: (() => {
      if (props.parameters.flex === false) {
        // parameters overrides
        return false;
      }
      if (isObject(props.options.flex) || isObject(props.parameters.flex)) {
        return {
          ...(isObject(props.options.flex) ? props.options.flex : {}),
          ...(isObject(props.parameters.flex) ? props.parameters.flex : {}),
        };
      } else if (props.options.flex || props.parameters.flex) {
        // handle flex: true
        return true;
      }
      return false;
    })(),
  };

  const {
    title,
    align,
    width,
    height,
    maxWidth,
    padding = 50,
    background,
    backdrop = 'white',
    cropMarks = true,
    border = 0,
    flex,
  } = combinedOptions;

  const { story } = props;
  let { hr } = combinedOptions;

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
    header: css({
      borderBottom: hr ? `solid 1px ${cropMarkColor}` : undefined,
      paddingTop: 2,
      paddingBottom: hr ? 15 : undefined,
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

  const flexStyle: GlamorValue = (() => {
    if (!flex) {
      return {};
    }
    if (flex === true) {
      return {
        display: 'flex',
      };
    }
    return {
      display: 'flex',
      ...flex,
    };
  })();

  return (
    <div {...styles.base}>
      {title && (
        <div {...styles.header}>
          <h2 {...styles.h2}>{title}</h2>
        </div>
      )}
      {combinedOptions.styles}
      <div {...styles.body}>
        <AlignmentContainer align={align}>
          <CropMarks
            width={width}
            height={height}
            maxWidth={maxWidth}
            background={componentBackground as string}
            cropMarkColor={cropMarkColor}
            cropMarksVisible={cropMarks}
            border={componentBorder}
            style={flexStyle}
          >
            {story(props.context)}
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

function isDark(color: tinycolor.Instance): boolean {
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

function isObject(value: any): value is object {
  return value !== null && typeof value === 'object';
}
