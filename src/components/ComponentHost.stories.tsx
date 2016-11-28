import * as React from 'react';
import { storiesOf, host } from '..';

const STORY_TITLE = 'helpers.storybook';

const el = (
  <div style={{
    boxSizing: 'border-box',
    padding: 10,
    width: '100%',
    height: '100%',
  }}>Hello</div>
);

storiesOf(STORY_TITLE, module)
  .addDecorator(host({
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
  }))
  .add('MyComponent', () => {
    return el;
  });

storiesOf(STORY_TITLE, module)
  .addDecorator(host({
    title: 'Foo',
    mobXDevTools: false,
  }))
  .add('No mobXDevTools', () => {
    return el;
  });

storiesOf(STORY_TITLE, module)
  .addDecorator(host({ title: 'Foo', backdrop: true }))
  .add('backdrop: true (RED)', () => el);

storiesOf(STORY_TITLE, module)
  .addDecorator(host({ title: 'Foo', backdrop: '#2196F3' }))
  .add('backdrop: blue', () => el);

storiesOf(STORY_TITLE, module)
  .addDecorator(host({ title: 'Foo', backdrop: -0.1 }))
  .add('backdrop: -0.1', () => el);

storiesOf(STORY_TITLE, module)
  .addDecorator(host({ title: 'Foo', backdrop: -0.5 }))
  .add('backdrop: -0.5', () => el);

storiesOf(STORY_TITLE, module)
  .addDecorator(host({ title: 'Foo', backdrop: -0.8 }))
  .add('backdrop: -0.8', () => el);

storiesOf(STORY_TITLE, module)
  .addDecorator(host({ title: 'Foo' }))
  .add('backdrop: none (white)', () => el);

storiesOf(STORY_TITLE, module)
  .addDecorator(host({ title: 'Foo', backdrop: -0.1, background: 1, border: -0.3 }))
  .add('backdrop: -0.1, background: 1', () => el);
