export {};

declare global {
  /**
   * ホバーしたとき、プロパティを読みやすく表示する。
   *
   * REF: https://www.totaltypescript.com/concepts/the-prettify-helper
   */
  type Prettify<T> = { [K in keyof T]: T[K] } & unknown;

  /**
   *  オプショナルな型に変換する
   *
   * NOTE: `exactOptionalPropertyTypes` を有効にし、 `Partial` の定義が変わったため。
   */
  type Optional<T> = {
    [K in keyof T]?: T[K] | undefined;
  };

  type Primitive =
    | boolean
    | number
    | string
    | undefined
    | null
    | symbol
    | bigint;

  /** 属性のキーのみを返す */
  type OnlyProperty<T, K extends keyof T> = T[K] extends CallableFunction
    ? never
    : K extends "type"
    ? never
    : K;

  /** 属性のみを返す */
  type Property<T> = {
    [K in keyof T as OnlyProperty<T, K>]: T[K];
  };

  /** キーを取得できるかどうかを判定する */
  type IsEmpty<T> = keyof {
    [K in keyof T as OnlyProperty<T, K>]: unknown;
  } extends never
    ? true
    : false;

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
  type XOR<T, U> = T | U extends object
    ? (Without<T, U> & U) | (Without<U, T> & T)
    : T | U;

  type TreeNode<T, C extends PropertyKey = "children"> = T & {
    [key in C]: TreeNode<T>[];
  };

  type EnsureSameType<T, U> = T extends U ? (U extends T ? T : never) : never;

  type Head<T extends unknown[]> = T[0];
  type Tail<T extends unknown[]> = T extends [unknown, ...infer U] ? U : never;

  type Unique<T extends unknown[], Acc extends unknown[] = []> = T extends []
    ? Acc
    : Unique<Tail<T>, Head<T> extends Acc[number] ? Acc : [...Acc, Head<T>]>;

  type Mandatory<T> = T extends undefined ? never : T;
  type Option<T> = T | undefined;

  type Match<T, Pattern, Result> = T extends Pattern ? Result : never;
}
