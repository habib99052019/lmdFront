import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddArticleComponent } from './article/add-article/add-article.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { AddDepotComponent } from './depot/add-depot/add-depot.component';
import { AddFamilyComponent } from './family/add-family/add-family.component';
import { AddTypeComponent } from './type/add-type/add-type.component';



const routes: Routes = [
    {
        path: 'article/add',
        component: AddArticleComponent
      },
      {
        path: 'type/add',
        component: AddTypeComponent
      },
      {
        path: 'family/add',
        component: AddFamilyComponent
      },
      {
        path: 'category/add',
        component: AddCategoryComponent
      },
      {
        path: 'depot/add',
        component: AddDepotComponent
      },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingsRoutingModule {}