import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListRecipeComponent } from './list/list-recipe/list-recipe.component';
import { EditRecipeComponent } from './edit/edit-recipe/edit-recipe.component';
import { IndexComponent } from './index/index.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { ListIngredientComponent } from './list/list-ingredient/list-ingredient.component';
import { EditIngredientComponent } from './edit/edit-ingredient/edit-ingredient.component';
import { EditMessageComponent } from './edit/edit-message/edit-message.component';
import { ListMessageComponent } from './list/list-message/list-message.component';
import { EditUserComponent } from './edit/edit-user/edit-user.component';
import { ListUserComponent } from './list/list-user/list-user.component';


const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'recipes/:azonosito',
    component: RecipeDetailsComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'dashboard/recipes',
    component: ListRecipeComponent
  },
  {
    path: 'dashboard/recipes/new',
    component: EditRecipeComponent
  },
  {
    path: 'dashboard/recipes/:id',
    component: EditRecipeComponent
  },
  {
    path: 'dashboard/ingredients',
    component: ListIngredientComponent
  },
  {
    path: 'dashboard/ingredients/new',
    component: EditIngredientComponent
  },
  {
    path: 'dashboard/ingredients/:id',
    component: EditIngredientComponent
  },
  {
    path: 'dashboard/messages',
    component: ListMessageComponent
  },
  {
    path: 'dashboard/messages/new',
    component: EditMessageComponent
  },
  {
    path: 'dashboard/messages/:id',
    component: EditMessageComponent
  },
  {
    path: 'dashboard/users',
    component: ListUserComponent
  },
  {
    path: 'dashboard/users/new',
    component: EditUserComponent
  },
  {
    path: 'dashboard/users/:id',
    component: EditUserComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
