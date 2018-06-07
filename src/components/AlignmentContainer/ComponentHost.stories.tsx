import { React, storiesOf, Foo, css, color } from '../../test';
import { host, AlignEdge } from '../..';

const describe = (name: string, props: any) => {
  storiesOf('AlignmentContainer', module)
    .addDecorator(
      host({
        title: `Aligns the component within the host: "${props.align}"`,
        ...props,
      }),
    )
    .add(name, () => <Test>{name}</Test>);
};

const align = (edge: AlignEdge, props: any = {}) => {
  describe(edge.toString(), { ...props, align: edge });
};

const Test = (props: any) => {
  const styles = {
    base: css({
      width: 150,
      height: 150,
      border: `solid 1px ${color.format(-0.1)}`,
    }),
  };
  return <Foo style={styles.base} {...props} />;
};

align('top left');
align('top center');
align('top right');

align('middle left');
align('middle center');
align('middle right');

align('bottom left');
align('bottom center');
align('bottom right');
