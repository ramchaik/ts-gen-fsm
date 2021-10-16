export type Primitives = string | number | symbol;
export type EventTypeMapping<I extends Primitives> = { [K in I]: unknown };

export type TransitionMap<
  I extends Primitives,
  S,
  E extends EventTypeMapping<I>
> = {
  [K in I]: (event: E[I], currentState: I, extraState: S) => I;
};
