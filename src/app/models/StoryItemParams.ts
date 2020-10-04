import {Priority, Status} from './';

export interface StoryItemParams {
  parent?: number;
  status?: Status;
  priority?: Priority;
  search?: string;
  includeParent?: boolean;
  number?: number;
  size?: number;
  sort?: string;
  direction?: string;
}

export function toRawParams(params: StoryItemParams): Record<string, string> {
  if (!params) { return null; }
  return Object.keys(params).reduce((accumulator, key) => {
    if (params[key]) {
      accumulator[key] = params[key].toString();
    }
    return accumulator;
  }, {});
}
