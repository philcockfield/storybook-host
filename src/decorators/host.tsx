import * as React from 'react';
import ComponentHost from '../components/ComponentHost';
import { IHostProps } from '../components/ComponentHost';
export { IHostProps }

/**
 * Decorator to concisely insert the <ComponentHost> helpers.
 *
 *    storiesOf('primitives.Button', module)
 *      .addDecorator(host({ header: 'My Header' }))
 *      .add(...)
 */
export function host(props: IHostProps) {
  return (story: Function, context: any) => {
    return <ComponentHost story={story} {...props} />;
  };
}
