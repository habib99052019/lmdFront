import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent} from './menu/menu.component';
import { ChambreComponent} from './chambre/chambre.component'
import { ChambreListComponent } from './chambre-list/chambre-list.component';
import {EditChambreReservationComponent} from './edit-chambre-reservation/edit-chambre-reservation.component';
import { DemoComponent } from './demo/component';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: 'calendrier',
    component: ChambreComponent
  },
  {
    path : 'chambre',
    component : ChambreListComponent,
  },
  {
    path : 'test',
    component : DemoComponent,
  },
  {
    path : 'chambre-list/edit/:id',
    component : EditChambreReservationComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }
