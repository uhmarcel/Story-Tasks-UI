
export interface StoryItem {
  identifier: Identifier;
  parent: number;
  children: number[];
  title: string;
  description: string;
  tasks: Task[];
  priority: Priority;
  size: Size;
  status: Status;
}

export interface Identifier {
  userId: string;
  referenceId: number;
}

export interface Task {
  id?: string;
  label: string;
  done: boolean;
}

export interface StoryItemParams {
  parent?: number;
  status?: Status;
  priority?: Priority;
  includeParent?: boolean;
}

export type Priority = 'BLOCKER' | 'CRITICAL' | 'VERY_HIGH' | 'HIGH' | 'MEDIUM' | 'LOW' | 'VERY_LOW' | 'OPTIONAL';

export type Size = 'XXL' | 'XL' | 'L' | 'M' | 'S';

export enum Status {
  'ANALYSIS' = 'ANALYSIS',
  'TODO' = 'TODO',
  'IN_PROGRESS' = 'IN_PROGRESS',
  'DONE' = 'DONE'
}

// Type metadata

export const typeKeys = {
  priorities: ['BLOCKER', 'CRITICAL', 'VERY_HIGH', 'HIGH', 'MEDIUM', 'LOW', 'VERY_LOW', 'OPTIONAL'] as Priority[],
  sizes: ['XXL', 'XL', 'L', 'M', 'S'] as Size[],
  statuses: ['ANALYSIS', 'TODO', 'IN_PROGRESS', 'DONE'] as Status[],
};

export const keyValue = {
  priorities: toElementIndexMap(typeKeys.priorities),
  sizes: toElementIndexMap(typeKeys.sizes),
  statuses: toElementIndexMap(typeKeys.statuses),
};

function toElementIndexMap(array: any[]): object {
  return array.reduce((acc, elem, index) => {
    acc[elem] = index;
    return acc;
  }, {});
}
