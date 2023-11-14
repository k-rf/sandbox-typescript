import { KeyPair } from "./types";

export const convertListToTree = <P extends PropertyKey, F extends PropertyKey>(
  pk: P,
  fk: F extends P ? never : F
) => {
  return <
    T extends Record<PropertyKey, unknown> & KeyPair<P, F, V>,
    V extends { valueOf?: () => unknown; unpack?: () => unknown },
  >(
    obj: (T & KeyPair<P, F, V>)[]
  ) => {
    const equals = (a: V | undefined, b: V | undefined) => {
      (a?.unpack?.() ?? a?.valueOf?.()) === (b?.unpack?.() ?? b?.valueOf?.());
    };

    const roots = obj.filter(
      (item: KeyPair<P, F, V>) =>
        !obj.some((other) => equals(item[fk], other[pk]))
    );

    const toTree = (item: T): TreeNode<T> => {
      return {
        ...item,
        children: obj
          .filter((other: KeyPair<P, F, V>) => equals(item[pk], other[fk]))
          .map(toTree),
      };
    };

    return roots.map(toTree);
  };
};
