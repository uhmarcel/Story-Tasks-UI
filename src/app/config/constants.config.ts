import {Priority, Size, Status} from '../models';

export const CONSTANTS = {
  APP_NAME: 'Story Tasks',
  APP_OWNER: 'uhmarcel',
  APP_OWNER_LINK: 'https://github.com/uhmarcel',
  MOBILE_VIEW_BREAKPOINT: 786,
  NO_PARENT: -1
};

export const DEFAULTS = {
  parent: CONSTANTS.NO_PARENT,
  status: Status.ANALYSIS,
  priority: Priority.MEDIUM,
  size: Size.M,
};
