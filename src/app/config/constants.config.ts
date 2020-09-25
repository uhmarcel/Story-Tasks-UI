import {Status} from '../models/types';

export const CONSTANTS = {
  NO_PARENT: -1
};

export const DEFAULTS = {
  parent: CONSTANTS.NO_PARENT,
  status: Status.ANALYSIS,
  priority: 'MEDIUM',
  size: 'M',
};
