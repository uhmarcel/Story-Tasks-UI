
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

export enum Priority {
  BLOCKER = 'BLOCKER',
  CRITICAL = 'CRITICAL',
  VERY_HIGH = 'VERY_HIGH',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
  VERY_LOW = 'VERY_LOW',
  OPTIONAL = 'OPTIONAL'
}

export enum Size {
  XXL = 'XXL',
  XL = 'XL',
  L = 'L',
  M = 'M',
  S = 'S'
}

export enum Status {
  ANALYSIS = 'ANALYSIS',
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}

export enum Color {
  PURPLE = '#D6CDEA',
  BLUE = '#CBE4F9',
  RED = '#F9D8D6',
  GREEN = '#BCDFC9',
  YELLOW = '#FFFFBB',
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
