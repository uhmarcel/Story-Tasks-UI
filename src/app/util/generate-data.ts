import { StoryItem, typeKeys} from '../models/types';
import * as faker from 'faker';


export function generateMockStory(id: number, idPool: number[] = []): StoryItem {
 return {
   id: id ? id : getNextAvailableId(idPool),
   name: faker.name.title(),
   description: faker.company.catchPhraseDescriptor(),
   children: pickMany(idPool, 5),
   tasks: [],
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

function  getNextAvailableId(idPool: number[]) {
  const set = new Set<number>(idPool);
  for (let candidate = 0; candidate < idPool.length; candidate++) {
    if (!set.has(candidate)) {
      return candidate;
    }
  }
  return idPool.length;
}
