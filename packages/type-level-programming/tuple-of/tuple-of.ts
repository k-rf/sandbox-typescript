import { range } from "remeda";

type TupleOf<
  T,
  N extends number,
  Acc extends readonly T[] = readonly [],
> = `${N}` extends `-${number}`
  ? readonly []
  : Acc["length"] extends N
  ? Acc
  : TupleOf<T, N, readonly [...Acc, T]>;

type TupleRangeFn = {
  <N extends number>(length: N): TupleOf<number, N>;
  <T, N extends number>(length: N, mapper: (index: number) => T): TupleOf<T, N>;
};

export const tupleRange: TupleRangeFn = <T, N extends number>(
  length: N,
  mapper?: (index: number) => T
) => {
  return range(0, length).map((...[, i]) =>
    mapper ? mapper(i) : i
  ) as TupleOf<T, N>;
};
