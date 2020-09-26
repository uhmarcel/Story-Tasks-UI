import {Priority, Status} from './';

export interface StoryItemParams {
  parent?: number;
  status?: Status;
  priority?: Priority;
  includeParent?: boolean;
}
