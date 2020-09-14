import {StoryItemParams} from '../models/types';

export function toRawParams(params: StoryItemParams): Record<string, string> {
  if (!params) { return null; }
  const rawParams = {};
  if (params.parent) { rawParams[`parent`] = params.parent?.toString(); }
  if (params.status) { rawParams[`status`] = params.status as string; }
  if (params.priority) { rawParams[`priority`] = params.priority as string; }
  if (params.includeParent) { rawParams[`includeParent`] = params.includeParent.toString(); }
  return rawParams;
}
