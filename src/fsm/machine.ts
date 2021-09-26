type Primitives = string | number | symbol;
type EventTypeMapping<I extends Primitives> = { [K in I]: unknown };

type TransitionMap<I extends Primitives, S, E extends EventTypeMapping<I>> = {
  [K in I]: (event: E[I], currentState: I, extraState: S) => I;
};

export class Machine<I extends Primitives, S, E extends EventTypeMapping<I>> {
  constructor(
    readonly state: S,
    readonly initialState: I,
    readonly transitions: TransitionMap<I, S, E>,
    public currentState: I = initialState
  ) {}

  step(event: E[I]): [I, I] {
    const currentState = this.currentState;
    const newState = this.transitions[currentState](
      event,
      currentState,
      this.state
    );
    this.currentState = newState;
    return [currentState, newState];
  }
}
