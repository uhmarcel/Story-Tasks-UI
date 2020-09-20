import { StoryItem, typeKeys, Task} from '../models/types';
import * as faker from 'faker';


export function generateMockStory(id: number, idPool: number[] = []): StoryItem {
 return {
   identifier: { userId: null, referenceId: id ? id : getNextAvailableId(idPool) },
   parent: pickParent(idPool),
   children: [],
   title: faker.name.title(),
   description: faker.lorem.paragraph(),
   tasks: generateTasks(4),
   priority: pickOne(typeKeys.priorities),
   size: pickOne(typeKeys.sizes),
   status: pickOne(typeKeys.statuses),
 } as StoryItem;
}

function pickOne<T>(array: T[]): T {
  if (array.length === 0) { return null; }

  const size = array.length;
  const randomIndex = Math.floor(Math.random() * size);
  return array[randomIndex];
}

function pickMany<T>(array: T[], max: number = array.length): number[] {
  const effectiveMax = Math.min(max, array.length) + 1;
  const amount = Math.floor(Math.random() * effectiveMax);
  const children = [];

  for (let i = 0; i < amount; i++) {
    const randomIndex = Math.floor(Math.random() * array.length);
    children.push(array[randomIndex]);
  }
  return children;
}

function  getNextAvailableId(idPool: number[]): number {
  const set = new Set<number>(idPool);
  for (let candidate = 0; candidate < idPool.length; candidate++) {
    if (!set.has(candidate)) {
      return candidate;
    }
  }
  return idPool.length;
}

function generateTasks(max: number): Task[] {
  const amount = Math.floor(Math.random() * (max + 1));
  const tasks: Task[] = [];

  for (let i = 0; i < amount; i++) {
    tasks.push({
      id: null,
      label: faker.lorem.sentence(),
      done: Math.random() < 0.33,
    });
  }
  return tasks;
}

function pickParent(idPool: number[]): number {
  let parent = -1;
  if (Math.random() > 0.5 && idPool.length > 0) {
    parent = pickOne(idPool);
  }
  return parent;
}
