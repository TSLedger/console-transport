import { stringify } from '../deps.ts';

export function serialize(context: unknown): string {
  return stringify
    .default
    .pure
    .indentation('  ')
    .precision(2)
    .formatter((x: unknown, y: { state: { depth: number; indentation: string } }): unknown => {
      if (typeof x !== 'object' || !(x instanceof Error)) {
        return undefined;
      }
      return `${
        x.stack?.split('\n').map((v, i) => {
          if (i >= 1) v = ''.padStart((y.state.depth * 2) + y.state.indentation.length + 2, '  ') + v.trimStart();
          return v;
        }).join('\n')
      }`;
    })
    .noFancy(context) as string;
}
