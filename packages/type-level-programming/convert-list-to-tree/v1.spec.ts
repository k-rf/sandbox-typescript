import { convertListToTree } from "./v1";

describe("convertListToTree", () => {
  it("ルートが1つの場合", () => {
    const data = [
      { id: 1, parentId: undefined },
      { id: 2, parentId: 1 },
      { id: 3, parentId: 1 },
    ];

    const result = convertListToTree("id", "parentId")(data);

    expect(result).toEqual([
      {
        id: 1,
        parentId: undefined,
        children: [
          { id: 2, parentId: 1, children: [] },
          { id: 3, parentId: 1, children: [] },
        ],
      },
    ]);
  });

  it("ルートが複数の場合", () => {
    const data = [
      { id: 1, parentId: undefined },
      { id: 2, parentId: undefined },
      { id: 3, parentId: 1 },
    ];

    const result = convertListToTree("id", "parentId")(data);

    expect(result).toEqual([
      {
        id: 1,
        parentId: undefined,
        children: [{ id: 3, parentId: 1, children: [] }],
      },
      {
        id: 2,
        parentId: undefined,
        children: [],
      },
    ]);
  });

  it("階層が複数ある場合", () => {
    const data = [
      { id: 1, parentId: undefined },
      { id: 2, parentId: 1 },
      { id: 3, parentId: 2 },
    ];

    const result = convertListToTree("id", "parentId")(data);

    expect(result).toEqual([
      {
        id: 1,
        parentId: undefined,
        children: [
          {
            id: 2,
            parentId: 1,
            children: [{ id: 3, parentId: 2, children: [] }],
          },
        ],
      },
    ]);
  });

  describe("型チェック", () => {
    convertListToTree(
      "id",
      "pid"
    )([
      {
        // @ts-expect-error: `id` と `pid` の型が異なるためエラーになる
        id: 1,
        pid: "2",
      },
      {
        // @ts-expect-error: `pk` は必須のためエラーになる
        id: undefined,
        pid: "2",
      },
      {
        id: "1",
        pid: "2",
      },
      {
        id: "2",
        pid: undefined,
      },
    ]);
  });
});
