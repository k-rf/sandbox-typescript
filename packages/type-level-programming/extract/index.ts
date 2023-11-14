function noop(..._: unknown[]): void {}

type Primitive = boolean | number | string | undefined | null | symbol | bigint;
function fn<T extends Primitive, U extends Primitive>(
  a: T,
  b: U extends T ? never : U
) {
  noop(a, b);
}

// @ts-expect-error: Args are same value
fn(true, true);
fn(true, false);
// @ts-expect-error: Args are same value
fn(1, 1);
fn(1, 2);
// @ts-expect-error: Args are same value
fn("a", "a");
fn("a", "b");

/**
 * オブジェクトから値を取り出す。
 */

const extractV1 = (obj: Record<PropertyKey, unknown>, key: string) => {
  return obj[key];
};

export const v1 = extractV1({ a: 1 }, "a");
//           ^?

const extractV2 = <T extends Record<PropertyKey, unknown>>(
  obj: T,
  key: string
) => {
  return obj[key];
};

export const v2 = extractV2({ a: 1 }, "a");
//           ^?

const extractV3 = <T extends Record<PropertyKey, unknown>>(
  obj: T,
  key: keyof T
) => {
  return obj[key];
};

export const v3 = extractV3({ a: 1, b: "z" }, "a");
//           ^?

const extractWithTuple = <
  T extends Record<PropertyKey, unknown>,
  P extends keyof T,
  S extends keyof T,
>(
  obj: T,
  primary: P,
  secondary: S
): [T[P], T[S]] => {
  return [obj[primary], obj[secondary]];
};

export const v4 = extractWithTuple({ a: 1, b: "z" }, "a", "b");
//           ^?

const extractWithTupleByUniqueKey = <
  T extends Record<PropertyKey, unknown>,
  P extends keyof T,
  S extends keyof T,
>(
  obj: T,
  primary: P,
  secondary: S extends P ? never : S
): [T[P], T[S]] => {
  return [obj[primary], obj[secondary]];
};

export const v5 = extractWithTupleByUniqueKey({ a: 1, b: "z" }, "a", "b");
//           ^?
