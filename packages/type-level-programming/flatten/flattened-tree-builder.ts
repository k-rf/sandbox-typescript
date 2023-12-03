type ItemProps<T extends PropertyKey = PropertyKey> = { id: T };
type ParentKeyRecord<T extends ItemProps, P extends PropertyKey> = {
  [key in P]: T["id"] | undefined;
};
type DepthKeyRecord<D extends PropertyKey> = { [key in D]: number };

type BuildFn<
  T extends ItemProps,
  P extends PropertyKey = "parentId",
  D extends PropertyKey = "depth",
> = (parentId?: T["id"] | undefined, depth?: number) => FlattenedTree<T, P, D>;

type FlattenedTree<
  T extends ItemProps,
  P extends PropertyKey = "parentId",
  D extends PropertyKey = "depth",
> = (T & ParentKeyRecord<T, P> & DepthKeyRecord<D>)[];

type FlattenedTreeBuilderFn = {
  (): FlattenedTreeBuilderFnReturnType;
  <P extends PropertyKey = "parentId">(
    parentKey: P
  ): FlattenedTreeBuilderFnReturnType<P>;
  <P extends PropertyKey = "parentId", D extends PropertyKey = "depth">(
    parentKey: P,
    depthKey: D
  ): FlattenedTreeBuilderFnReturnType<P, D>;
};

type FlattenedTreeBuilderFnReturnType<
  P extends PropertyKey = "parentId",
  D extends PropertyKey = "depth",
> = {
  flattenedTree: typeof flattenedTree;
  item: ReturnType<typeof item<P, D>>;
};

// NOTE: `T` を型引数として受け取るようにしたいが、型レベルだと `item<P, D>(parentKey, depthKey)<T>` に相当する書き方ができない。
export const flattenedTreeBuilder: FlattenedTreeBuilderFn = <
  T extends ItemProps,
  P extends PropertyKey = "parentId",
  D extends PropertyKey = "depth",
>(
  parentKey?: P,
  depthKey?: D
) => {
  return {
    flattenedTree: flattenedTree<T>,
    item: item<P, D>(parentKey, depthKey)<T>,
  };
};

export const flattenedTree = <
  T extends ItemProps,
  P extends PropertyKey = "parentId",
  D extends PropertyKey = "depth",
>(
  ...itemFn: BuildFn<T, P, D>[]
): FlattenedTree<T, P, D> => {
  return itemFn.flatMap((fn) => fn());
};

export const item =
  <P extends PropertyKey = "parentId", D extends PropertyKey = "depth">(
    parentKey: P = "parentId" as P,
    depthKey: D = "depth" as D
  ) =>
  <T extends ItemProps>(props: T) =>
  (...itemFn: BuildFn<T, P, D>[]) =>
  (
    parentId?: T["id"] | undefined,
    depth: number = 0
  ): FlattenedTree<T, P, D> => {
    return [
      {
        ...props,
        ...({ [parentKey]: parentId } as ParentKeyRecord<T, P>),
        ...({ [depthKey]: depth } as DepthKeyRecord<D>),
      },
      ...itemFn.flatMap((fn) => fn(props.id, depth + 1)),
    ];
  };
