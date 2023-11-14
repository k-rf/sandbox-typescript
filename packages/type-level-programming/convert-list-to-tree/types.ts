export type KeyPair<P extends PropertyKey, F extends PropertyKey, V> = {
  [K in P | F]: Match<K, P, Mandatory<V>> | Match<K, F, Option<V>> | never;
};
