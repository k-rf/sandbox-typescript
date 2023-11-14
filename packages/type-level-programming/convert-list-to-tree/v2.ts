import { KeyPair } from "./types";

export const convertListToTree = <
  R extends Record<PropertyKey, unknown> & KeyPair<P, F, V>,
  P extends keyof R,
  F extends keyof R,
  V extends { valueOf?: () => unknown; unpack?: () => unknown },
>(
  records: R[],
  pk: P,
  fk: F extends P ? never : F
) => {
  const equals = (a: V | undefined, b: V | undefined) => {
    (a?.unpack?.() ?? a?.valueOf?.()) === (b?.unpack?.() ?? b?.valueOf?.());
  };

  const roots = records.filter(
    (item: KeyPair<P, F, V>) =>
      !records.some((other) => equals(item[fk], other[pk]))
  );

  const toTree = (item: R): TreeNode<R> => {
    return {
      ...item,
      children: records
        .filter((other: KeyPair<P, F, V>) => equals(item[pk], other[fk]))
        .map(toTree),
    };
  };

  return roots.map(toTree);
};

convertListToTree(
  [
    { id: 1, pid: 2, fid: 3 },
    { id: 2, pid: undefined, fid: 4 },
    { id: 3, pid: undefined, fid: 4 },
  ],
  "id",
  "pid"
);
