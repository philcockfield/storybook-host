import * as R from 'ramda';
import { AlignEdge } from '../types';

export { AlignEdge };
export type AlignHorizontal = 'left' | 'center' | 'right';
export type AlignVertical = 'top' | 'middle' | 'bottom';

const HORIZONTAL: AlignHorizontal[] = ['left', 'center', 'right'];
const VERTICAL: AlignVertical[] = ['top', 'middle', 'bottom'];

const contains = (array: string[], value: string) =>
  R.any(item => item === value, array);
const isVertical = (value: string) => contains(VERTICAL, value);
const isHorizontal = (value: string) => contains(HORIZONTAL, value);

/**
 * Extracts the edge alignments from the given value.
 */
export function edges(
  value: AlignEdge,
  defaultHorizontal: string,
  defaultVertical: string,
): { horizontal: AlignHorizontal; vertical: AlignVertical } {
  const parts = value.split(' ');

  // If only one axis was specified fill in the missing value.
  if (parts.length < 2) {
    if (isHorizontal(parts[0])) {
      parts[1] = defaultVertical;
    }
    if (isVertical(parts[0])) {
      parts[1] = defaultHorizontal;
    }
  }

  // Extract axis values.
  const horizontal = (isHorizontal(parts[0])
    ? parts[0]
    : parts[1]) as AlignHorizontal;
  const vertical = (isVertical(parts[0])
    ? parts[0]
    : parts[1]) as AlignVertical;

  // Finish up.
  return { horizontal, vertical };
}
