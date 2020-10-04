import {Status} from '../models';

export const CONSTANTS = {
  MOBILE_VIEW_BREAKPOINT: 786,
  NO_PARENT: -1
};

export const DEFAULTS = {
  parent: CONSTANTS.NO_PARENT,
  status: Status.ANALYSIS,
  priority: 'MEDIUM',
  size: 'M',
};
