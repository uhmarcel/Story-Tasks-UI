import {Identifier, Priority, Size, Status, Task} from './';

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
  color?: string;
}

// To delete

export const typeKeys = {
  priorities: ['BLOCKER', 'CRITICAL', 'VERY_HIGH', 'HIGH', 'MEDIUM', 'LOW', 'VERY_LOW', 'OPTIONAL'] as Priority[],
  sizes: ['XXL', 'XL', 'L', 'M', 'S'] as Size[],
  statuses: ['ANALYSIS', 'TODO', 'IN_PROGRESS', 'DONE'] as Status[],
};

// TODO: Proof of concept, delete once sorts are implemented on backend
export const statusMap: Record<Status, number> = {
  IN_PROGRESS: 1,
  TODO: 1,
  ANALYSIS: 1,
  DONE: 4,
};

export const keyValue = {
  priorities: toElementIndexMap(typeKeys.priorities),
  sizes: toElementIndexMap(typeKeys.sizes),
  statuses: statusMap,
};

function toElementIndexMap(array: any[]): object {
  return array.reduce((acc, elem, index) => {
    acc[elem] = index;
    return acc;
  }, {});
}
