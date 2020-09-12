import { StoryItem, typeKeys, Task} from '../models/types';
import * as faker from 'faker';


export function generateMockStory(id: number, idPool: number[] = []): StoryItem {
 return {
   id: id ? id : getNextAvailableId(idPool),
   name: faker.name.title(),
   description: faker.lorem.paragraph(),
   children: pickMany(idPool, 4),
   tasks: generateTasks(4),
   priority: pickOne(typeKeys.priorities),
   size: pickOne(typeKeys.sizes),
   status: pickOne(typeKeys.statuses),
 } as StoryItem;
}

function pickOne<T>(array: T[]): T {
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
      label: faker.lorem.sentence(),
      done: Math.random() < 0.33,
    });
  }
  return tasks;
}
