import * as React from 'react';
import { ComponentHost, IHostOptions } from '../components/ComponentHost';
export { IHostOptions as IHostProps };
import { makeDecorator, StoryContext } from '@storybook/addons';

/**
 * Decorator to concisely insert the <ComponentHost> helpers.
 *
 *    storiesOf('primitives.Button', module)
 *      .addDecorator(host({ header: 'My Header' }))
 *      .add(...)
 */
export const host = makeDecorator({
  name: 'host',
  parameterName: 'host',
  wrapper: (
    storyFn: (context: StoryContext) => any,
    context,
    { options, parameters },
  ) => {
    return (
      <ComponentHost
        story={storyFn}
        context={context}
        options={options || {}}
        parameters={parameters || {}}
      />
    );
  },
});
