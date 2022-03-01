import { FactoryTarget } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorieComponent } from './depot/categorie/categorie.component';
import { FamilleComponent } from './depot/categorie/famille/famille.component';
import { ArticleComponent } from './depot/categorie/famille/type/article/article.component';
import { TypeComponent } from './depot/categorie/famille/type/type.component';
import { DepotComponent } from './depot/depot.component';


const routes: Routes = [
  {
    path: 'gestion-stock',
    component: DepotComponent
  },
  {
    path: 'gestion-stock/depot/categorie/:name',
    component: CategorieComponent
  },
  {
    path: 'gestion-stock/depot/categorie/:name/:name',
    component: FamilleComponent
  },
  {
    path: 'gestion-stock/depot/categorie/:name/:name/:name',
    component: TypeComponent
  },
  {
    path: 'gestion-stock/depot/categorie/:name/:name/:name/:name',
    component: ArticleComponent
  },

 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule { }
