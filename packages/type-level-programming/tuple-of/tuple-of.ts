import { range } from "fp-ts/lib/NonEmptyArray";

type TupleOf<
  T,
  N extends number,
  Acc extends T[] = [],
> = `${N}` extends `-${number}`
  ? []
  : Acc["length"] extends N
  ? Acc
  : TupleOf<T, N, [...Acc, T]>;

export const tupleRange = <T, N extends number>(
  length: N,
  mapper?: (index: number) => T
): TupleOf<T, N> => {
  if (length <= 0) return [] as TupleOf<T, N>;

  return range(0, length - 1).map((...[, i]) =>
    mapper ? mapper(i) : i
  ) as TupleOf<T, N>;
};
