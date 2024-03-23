import { range } from "remeda";

const size = 12;
const r: [start: number, end: number] = [-size, size + 1];

const m = " o";
const s = "  ";

/** 一次関数 */
const f1 = (x: number): number => {
  // y = ax + b
  return x;
};

/** 二次関数 */
const f2 = (x: number): number => {
  // y = ax^2 + bx + c
  return Math.round((x * x) / 4) - size;
};

/** 三次関数 */
const f3 = (x: number): number => {
  // y = ax^3 + bx^2 + cx + d
  return Math.round((x * (x - 10) * (x + 10)) / 48);
};

/** 半円 */
const circle = (x: number): number => {
  return Math.round(Math.sqrt(10 * 10 - x * x));
};

const render = (
  result: [
    x: number,
    xc: (x: number, xi: number) => boolean,
    ...range: [y: number, yc: (y: number, yi: number) => boolean][],
  ][]
) => {
  return range(...r)
    .map((yi) =>
      range(...r)
        .map((xi) =>
          result.find(
            ([x, xc, ...yr]) => xc(x, xi) && yr.every(([y, yc]) => yc(y, yi))
          )
            ? m
            : s
        )
        .join("")
    )
    .reverse()
    .join("\n");
};

const main = () => {
  const r1 = render(
    range(...r).map((x) => [
      x,
      (x, xi) => x === xi,
      [f1(x), (y, yi) => y > yi],
      [f2(x), (y, yi) => y < yi],
      [f2(x) + 5, (y, yi) => y !== yi],
    ])
  );
  const r2 = render(
    range(...r).map((x) => [
      x,
      (x, xi) => x === xi,
      [f3(x), (y, yi) => y < yi],
      [circle(x), (y, yi) => y > yi],
    ])
  );

  console.log(r1);
  console.log(r2);
};

main();
