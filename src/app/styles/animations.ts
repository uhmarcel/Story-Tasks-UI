import {animate, style, transition, trigger} from '@angular/animations';

export const easeIn = trigger('easeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('0.2s  ease-in', style({ opacity: 1 })),
  ])
]);

