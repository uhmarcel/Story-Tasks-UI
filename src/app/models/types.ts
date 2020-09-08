export interface StoryItem {
  id: number;
  name: string;
  description: string;
  children: number[];
  tasks: Task[];
  priority: Priority;
  size: Size;
  status: Status;
}

export interface Task {
  label: string;
  done: boolean;
}

export type Priority = 'BLOCKER' | 'CRITICAL' | 'VERY_HIGH' | 'HIGH' | 'MEDIUM' | 'LOW' | 'VERY_LOW' | 'OPTIONAL';

export type Size = 'XXL' | 'XL' | 'L' | 'M' | 'S';

export type Status = 'ANALYSIS' | 'TODO' | 'IN_PROGRESS' | 'DONE';

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
