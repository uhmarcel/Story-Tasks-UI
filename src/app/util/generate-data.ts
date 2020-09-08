import { StoryItem, typeKeys} from '../models/types';
import * as faker from 'faker';


export function generateMockStory(id: number): StoryItem {
 return {
   id,
   name: faker.name.title(),
   description: faker.company.catchPhraseDescriptor(),
   children: [],
   tasks: [],
   priority: takeAny(typeKeys.priorities),
   size: takeAny(typeKeys.sizes),
   status: takeAny(typeKeys.statuses),
 } as StoryItem;
}

function takeAny<T>(array: T[]): T {
  const size = array.length;
  const randomIndex = Math.floor(Math.random() * size);
  return array[randomIndex];
}
