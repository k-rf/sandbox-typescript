import { tupleRange } from "./tuple-of";

describe("tupleRange", () => {
  it("0 を渡すと、空のタプルを返す", () => {
    const result = tupleRange(0);
    expect(result).toEqual([]);
  });

  it("指定した長さのタプルを返す", () => {
    const result = tupleRange(3);
    expect(result).toEqual([0, 1, 2]);
  });

  it("`mapper` を渡すと、値をマッピングする", () => {
    const result = tupleRange(4, (index) => ({
      id: index,
      name: `Name ${index}`,
    }));
    expect(result).toEqual([
      { id: 0, name: "Name 0" },
      { id: 1, name: "Name 1" },
      { id: 2, name: "Name 2" },
      { id: 3, name: "Name 3" },
    ]);
  });

  it("-1 を渡すと、空のタプルを返す", () => {
    const result = tupleRange(-1);
    expect(result).toEqual([]);
  });
});
