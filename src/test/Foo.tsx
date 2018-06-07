import { React, css, GlamorValue } from '../common';

export interface IFooProps {
  children?: React.ReactNode;
  style?: GlamorValue;
}

export const Foo = (props: IFooProps) => {
  const styles = {
    base: css({
      position: 'relative',
      boxSizing: 'border-box',
      padding: 10,
      background: 'rgba(255, 0, 0, 0.1)',
    }),
  };
  return (
    <div {...css(styles.base, props.style)}>{props.children || 'Hello'}</div>
  );
};
