import { React, storiesOf, Foo } from '../../test';
import { host } from '../..';

const STORY = 'ComponentHost';

storiesOf(STORY, module)
  .addDecorator(
    host({
      title: 'A host container for components under test.',
      align: 'center bottom',
      height: '80%',
      width: 400,
      // hr: false,
      // padding: '0 200px',
      // padding: [20, 20, 35, 20],

      background: true,
      // backdrop: '#2196F3', // BLUE
      // backdrop: true,
      // cropMarks: false,
      // border: 'dashed 1px red',
      border: -0.1,
      // border: true,
    }),
  )
  .add('MyComponent', () => <Foo />);

storiesOf(STORY, module)
  .addDecorator(
    host({ title: 'Backdrop set to a color with boolean.', backdrop: true }),
  )
  .add('backdrop: true (RED)', () => <Foo />);

storiesOf(STORY, module)
  .addDecorator(
    host({ title: 'Backdrop set to a hex color.', backdrop: '#2196F3' }),
  )
  .add('backdrop: blue', () => <Foo />);

storiesOf(STORY, module)
  .addDecorator(
    host({
      title: 'Backdrop set to a color with number (-1..1).',
      backdrop: -0.1,
    }),
  )
  .add('backdrop: -0.1', () => <Foo />);

storiesOf(STORY, module)
  .addDecorator(
    host({
      title: 'Backdrop set to a color with number (-1..1).',
      backdrop: -0.5,
    }),
  )
  .add('backdrop: -0.5', () => <Foo />);

storiesOf(STORY, module)
  .addDecorator(
    host({
      title: 'Backdrop set to a color with number (-1..1).',
      backdrop: -0.8,
    }),
  )
  .add('backdrop: -0.8', () => <Foo />);

storiesOf(STORY, module)
  .addDecorator(host({ title: 'Backdrop not set (none).' }))
  .add('backdrop: none (white)', () => <Foo />);

storiesOf(STORY, module)
  .addDecorator(
    host({
      title: 'Component background set with number.',
      backdrop: -0.1,
      background: 1,
      border: -0.3,
    }),
  )
  .add('backdrop: -0.1, background: 1', () => <Foo />);

storiesOf(STORY, module)
  .addDecorator(
    host({
      title: 'Width height set to 100%',
      width: '100%',
      height: '100%',
    }),
  )
  .add('width/height: 100%', () => <Foo />);

storiesOf(STORY, module)
  .addDecorator(
    host({
      title: 'Flex applied to component container (boolean)',
      width: '100%',
      height: '100%',
      flex: true,
    }),
  )
  .add('flex: true', () => <Foo />);

storiesOf(STORY, module)
  .addDecorator(
    host({
      title:
        'Flex applied to component container, with child filling available space',
      width: '100%',
      height: '100%',
      flex: true,
    }),
  )
  .add('flex: fill', () => <Foo style={{ flex: 1 }} />);

storiesOf(STORY, module)
  .addDecorator(
    host({
      title:
        'Flex applied to component container, with children filling available space',
      width: '100%',
      height: '100%',
      flex: {
        flexDirection: 'column',
        alignItems: 'center',
      },
    }),
  )
  .add('flex (column): fill', () => (
    <>
      <Foo style={{ flex: 1, width: '50%' }} />
      <Foo style={{ flex: 1, width: '80%', marginTop: 100 }} />
    </>
  ));
