import { flattenedTreeBuilder } from "./flattened-tree-builder";

describe("flattenedTreeBuilder", () => {
  describe("型のテスト", () => {
    it("型引数、引数がないとき、デフォルト値が適用される", () => {
      const { item, flattenedTree } = flattenedTreeBuilder();

      const [result] = flattenedTree(
        item({ id: "B", name: "書籍" })(
          item({ id: "B1", name: "1章" })(
            item({ id: "B1.1", name: "1.1節" })()
          ),
          item({ id: "B2", name: "2章" })()
        )
      );

      result?.id;
      result?.name;
      result?.parentId;
      result?.depth;
    });

    it("型引数がなく、引数が指定されているとき、引数の値が適用される", () => {
      const { item, flattenedTree } = flattenedTreeBuilder("parent", "level");

      const [result] = flattenedTree(
        item({ id: "B", name: "書籍" })(
          item({ id: "B1", name: "1章" })(
            item({ id: "B1.1", name: "1.1節" })()
          ),
          item({ id: "B2", name: "2章" })()
        )
      );

      result?.id;
      result?.name;
      result?.parent;
      result?.level;

      // @ts-expect-error 引数の値 (`parent`) が適用されている
      result?.parentId;
      // @ts-expect-error 引数の値 (`level`) が適用されている
      result?.depth;
    });

    it("型引数を指定するとき、引数と一致している必要がある", () => {
      // @ts-expect-error 型引数と引数が一致している必要がある
      flattenedTreeBuilder<"parent">();
      // @ts-expect-error 型引数と引数が一致している必要がある
      flattenedTreeBuilder<"parent", "level">();
      // @ts-expect-error 型引数と引数が一致している必要がある
      flattenedTreeBuilder<"parent", "level">("parent");

      const { item, flattenedTree } = flattenedTreeBuilder<"parent", "level">(
        "parent",
        "level"
      );

      const [result] = flattenedTree(
        item({ id: "B", name: "書籍" })(
          item({ id: "B1", name: "1章" })(
            item({ id: "B1.1", name: "1.1節" })()
          ),
          item({ id: "B2", name: "2章" })()
        )
      );

      result?.id;
      result?.name;
      result?.parent;
      result?.level;

      // @ts-expect-error 引数の値 (`parent`) が適用されている
      result?.parentId;
      // @ts-expect-error 引数の値 (`level`) が適用されている
      result?.depth;
    });
  });

  describe("ふるまいのテスト", () => {
    it("木構造の入力からリスト構造のデータを生成する", () => {
      const { item, flattenedTree } = flattenedTreeBuilder();

      const result = flattenedTree(
        item({ id: "B", name: "書籍" })(
          item({ id: "B1", name: "1章" })(
            item({ id: "B1.1", name: "1.1節" })(),
            item({ id: "B1.2", name: "1.2節" })()
          ),
          item({ id: "B2", name: "2章" })(
            item({ id: "B2.1", name: "2.1節" })(
              item({ id: "B2.1.1", name: "2.1.1項" })(),
              item({ id: "B2.1.2", name: "2.1.2項" })()
            ),
            item({ id: "B2.2", name: "2.2節" })()
          )
        )
      );

      expect(result).toEqual([
        { id: "B", parentId: undefined, depth: 0, name: "書籍" },
        { id: "B1", parentId: "B", depth: 1, name: "1章" },
        { id: "B1.1", parentId: "B1", depth: 2, name: "1.1節" },
        { id: "B1.2", parentId: "B1", depth: 2, name: "1.2節" },
        { id: "B2", parentId: "B", depth: 1, name: "2章" },
        { id: "B2.1", parentId: "B2", depth: 2, name: "2.1節" },
        { id: "B2.1.1", parentId: "B2.1", depth: 3, name: "2.1.1項" },
        { id: "B2.1.2", parentId: "B2.1", depth: 3, name: "2.1.2項" },
        { id: "B2.2", parentId: "B2", depth: 2, name: "2.2節" },
      ]);
    });

    it("木構造の入力からリスト構造のデータを生成する (親IDのキーを変更)", () => {
      const { item, flattenedTree } = flattenedTreeBuilder("parent");

      const result = flattenedTree(
        item({ id: "B", name: "書籍" })(
          item({ id: "B1", name: "1章" })(
            item({ id: "B1.1", name: "1.1節" })(),
            item({ id: "B1.2", name: "1.2節" })()
          ),
          item({ id: "B2", name: "2章" })(
            item({ id: "B2.1", name: "2.1節" })(
              item({ id: "B2.1.1", name: "2.1.1項" })(),
              item({ id: "B2.1.2", name: "2.1.2項" })()
            ),
            item({ id: "B2.2", name: "2.2節" })()
          )
        )
      );

      expect(result).toEqual([
        { id: "B", parent: undefined, depth: 0, name: "書籍" },
        { id: "B1", parent: "B", depth: 1, name: "1章" },
        { id: "B1.1", parent: "B1", depth: 2, name: "1.1節" },
        { id: "B1.2", parent: "B1", depth: 2, name: "1.2節" },
        { id: "B2", parent: "B", depth: 1, name: "2章" },
        { id: "B2.1", parent: "B2", depth: 2, name: "2.1節" },
        { id: "B2.1.1", parent: "B2.1", depth: 3, name: "2.1.1項" },
        { id: "B2.1.2", parent: "B2.1", depth: 3, name: "2.1.2項" },
        { id: "B2.2", parent: "B2", depth: 2, name: "2.2節" },
      ]);
    });

    it("木構造の入力からリスト構造のデータを生成する (親IDのキーと深さのキーを変更)", () => {
      const { item, flattenedTree } = flattenedTreeBuilder("parent", "level");

      const result = flattenedTree(
        item({ id: "B", name: "書籍" })(
          item({ id: "B1", name: "1章" })(
            item({ id: "B1.1", name: "1.1節" })(),
            item({ id: "B1.2", name: "1.2節" })()
          ),
          item({ id: "B2", name: "2章" })(
            item({ id: "B2.1", name: "2.1節" })(
              item({ id: "B2.1.1", name: "2.1.1項" })(),
              item({ id: "B2.1.2", name: "2.1.2項" })()
            ),
            item({ id: "B2.2", name: "2.2節" })()
          )
        )
      );

      expect(result).toEqual([
        { id: "B", parent: undefined, level: 0, name: "書籍" },
        { id: "B1", parent: "B", level: 1, name: "1章" },
        { id: "B1.1", parent: "B1", level: 2, name: "1.1節" },
        { id: "B1.2", parent: "B1", level: 2, name: "1.2節" },
        { id: "B2", parent: "B", level: 1, name: "2章" },
        { id: "B2.1", parent: "B2", level: 2, name: "2.1節" },
        { id: "B2.1.1", parent: "B2.1", level: 3, name: "2.1.1項" },
        { id: "B2.1.2", parent: "B2.1", level: 3, name: "2.1.2項" },
        { id: "B2.2", parent: "B2", level: 2, name: "2.2節" },
      ]);
    });
  });
});
