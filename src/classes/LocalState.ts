import { XY } from './Interfaces';

/**
 * To get a new LocalState after setting a variable use setProperty('')
 * ex. localState.setMapScaling(2);
 *
 * @export
 * @class LocalState
 */
export class LocalState {
  mapScaling = 1;
  mapSize = new XY();

  constructor() {}

  clone() {
    return Object.assign(new LocalState(), this);
  }
}
