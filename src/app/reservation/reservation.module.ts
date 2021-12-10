import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import { ReservationRoutingModule } from './reservation-routing.module';
import { MenuComponent } from './menu/menu.component';
import { ChambreComponent } from './chambre/chambre.component';
import { FormDialogComponent } from './menu/form-dialog/form-dialog.component';
import { ChambreFormDialogComponent } from './chambre/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './menu/form-dialog/delete/delete.component';
import { FullCalendarModule } from "@fullcalendar/angular";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DemoUtilsModule } from './demo-utils/module'
import interactionPlugin from "@fullcalendar/interaction";
import { ChambreListComponent } from './chambre-list/chambre-list.component';
import { ChambreAddFormDialogComponent } from './chambre-list/form-dialog/form-dialog.component';
import { EditChambreReservationComponent } from './edit-chambre-reservation/edit-chambre-reservation.component';
import { MatStepperModule } from '@angular/material/stepper';
import {DemoComponent} from './demo/component';
import { ChambreReservationComponent } from './chambre-reservation/chambre-reservation.component';
import { DialogreservationnInfosComponent } from './chambre-reservation/dialogreservationn-infos/dialogreservationn-infos.component';
import { AddchambreReservationComponent } from './chambre-reservation/addchambre-reservation/addchambre-reservation.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin,
]);


@NgModule({
  declarations: [
    MenuComponent,
    ChambreComponent,
    DemoComponent,
    FormDialogComponent,
    DeleteDialogComponent,
    ChambreAddFormDialogComponent,
    ChambreFormDialogComponent,
    ChambreListComponent,
    EditChambreReservationComponent,
    ChambreReservationComponent,
    DialogreservationnInfosComponent,
    AddchambreReservationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    DemoUtilsModule,
    FullCalendarModule,
    MatStepperModule,
    ReactiveFormsModule,
    ReservationRoutingModule,
   
  ]
})
export class ReservationModule { }
