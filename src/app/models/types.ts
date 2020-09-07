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
