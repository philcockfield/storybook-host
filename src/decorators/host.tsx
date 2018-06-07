import { React } from '../common';
import { ComponentHost, IHostProps } from '../components/ComponentHost';
export { IHostProps };

/**
 * Decorator to concisely insert the <ComponentHost> helpers.
 *
 *    storiesOf('primitives.Button', module)
 *      .addDecorator(host({ header: 'My Header' }))
 *      .add(...)
 */
export function host(props: IHostProps) {
  return (story: () => any, context: any) => {
    return <ComponentHost story={story} {...props} />;
  };
}
