import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'storyId'
})
export class StoryIdPipe implements PipeTransform {

  transform(id: number): string {
    return 'ST-' + id.toString().padStart(4, '0');
  }

}
