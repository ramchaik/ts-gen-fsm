import { Machine } from './fsm/machine';

type Floor = 1 | 2 | 3;
type AllowedEvents = {
  1: void;
  2: void;
  3: void;
};
type ExtraState = {
  direction: 'up' | 'down';
};

const elevator = new Machine<Floor, ExtraState, AllowedEvents>(
  { direction: 'up' },
  1,
  {
    1: (e, f, s) => {
      return (s.direction = 'up'), 2;
    },
    2: (e, f, s) => {
      return s.direction === 'up' ? 3 : 1;
    },
    3: (e, f, s) => {
      return (s.direction = 'down'), 2;
    },
  }
);

console.log(`*** starting ***`);
for (let i = 0; i < 12; i++) {
  const [previousFloor, nextFloor] = elevator.step(void 0);
  console.log(
    `Elevator going ${elevator.state.direction}: ${previousFloor} -> ${nextFloor}`
  );
  if (elevator.currentState === 1) {
    console.log(`---Cycle complete---`);
  }
}
console.log(`*** done ***`);
