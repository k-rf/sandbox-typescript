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
    const result = tupleRange(4, (index) => `Item ${index}`);
    expect(result).toEqual(["Item 0", "Item 1", "Item 2", "Item 3"]);
  });

  it("-1 を渡すと、空のタプルを返す", () => {
    // @ts-expect-error ふるまいとしては OK だが型レベルでエラーになる
    // TODO: 負の値に対応する
    const result = tupleRange(-1);
    expect(result).toEqual([]);
  });
});
