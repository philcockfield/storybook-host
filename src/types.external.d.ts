declare module '@kadira/storybook-addon-knobs' {
  interface IStoryContext {
    kind: string;
    story: string;
  }
  interface IKnobOption<T> {
    value: T;
    type: 'text' | 'boolean' | 'number' | 'object' | 'select' | 'date';
  }
  export function knob<T>(name: string, options: IKnobOption<T>): T;
  export function text(name: string, value: string): string;
  export function boolean(name: string, value: boolean): boolean;
  export function number(name: string, value: number): number;
  export function object(name: string, value: Object): Object;
  export function select<T>(name: string, options: { [ s: string ]: T }, value: string): T;
  export function date(name: string, value?: Date);
  export function withKnobs(storyFn: Function, context: IStoryContext): any;
}
