import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html',
})
export class DemoComponent {
  
  view: string = 'week';

  viewDate: Date = new Date();

  events = [
    {
      start: new Date('2021-10-10'),
      end: new Date('2021-10-10'),
      title: 'A 3 day event',
      allDay: true,
      color: {
        primary: '#ad2121',
        secondary: '#FAE3E3',
      },
    },
    {
      start: new Date('2021-10-10'),
      end: new Date('2021-10-10'),
      title: 'A 3 day event',
      allDay: true,
      color: {
        primary: '#ad2121',
        secondary: '#000000',
      },
    },
    {
      start: new Date('2021-10-10'),
      end: new Date('2021-10-10'),
      title: 'A 3 day event',
      allDay: true,
      color: {
        primary: '#ad2121',
        secondary: '#FAE3E3',
      },
    },
    {
      start: new Date('2021-10-10'),
      end: new Date('2021-10-10'),
      title: 'A 3 day event',
      allDay: true,
      color: {
        primary: '#ad2121',
        secondary: '#000000',
      },
    },
    {
      start: new Date('2021-10-10'),
      end: new Date('2021-10-10'),
      allDay: true,
      color: {
        primary: '#FFF',
        secondary: '#FFF',
      },
    },
    {
      start: new Date('2021-10-10'),
      end: new Date('2021-10-10'),
      title: 'A 3 day event',
      allDay: true,
      color: {
        primary: '#ad2121',
        secondary: '#FAE3E3',
      },
    },
    {
      start: new Date('2021-10-10'),
      end: new Date('2021-10-10'),
      title: 'A 3 day event',
      allDay: true,
      color: {
        primary: '#ad2121',
        secondary: '#000000',
      },
    },
    {
      start: new Date('2021-10-10'),
      end: new Date('2021-10-10'),
      title: 'A 3 day event',
      allDay: true,
      color: {
        primary: '#ad2121',
        secondary: '#FAE3E3',
      },
    },
    {
      start: new Date('2021-10-10'),
      end: new Date('2021-10-10'),
      title: 'A 3 day event',
      allDay: true,
      color: {
        primary: '#ad2121',
        secondary: '#000000',
      },
    },
  ];
}
