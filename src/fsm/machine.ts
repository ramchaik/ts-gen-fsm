/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { Primitives, EventTypeMapping, TransitionMap } from '../types';

export class Machine<
  I extends Primitives,
  S,
  E extends EventTypeMapping<I>
> {
  constructor(
    readonly state: S,
    readonly initialState: I,
    readonly transitions: TransitionMap<I, S, E>,
    public currentState: I = initialState
  // eslint-disable-next-line no-empty-function
  ) {}

  step(event: E[I]): [I, I] {
    const { currentState } = this;
    const newState = this.transitions[currentState](
      event,
      currentState,
      this.state
    );
    this.currentState = newState;
    return [currentState, newState];
  }
}
