import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmptyPageComponent } from './empty-page/empty-page.component';
import { StcokOptionsComponent } from './stcok-options/stcok-options.component';

const routes: Routes = [
  {
    path: 'gestion-stock',
    component: EmptyPageComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule { }
