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
import { EditMenuComponent } from './edit/edit-menu/edit-menu.component';
import { ListMenuComponent } from './list/list-menu/list-menu.component';
import { LoginComponent } from './page/login/login.component';
import { ForbiddenComponent } from './page/forbidden/forbidden.component';
import { AuthGuardService } from './service/auth-guard.service';
import { RoleGuardService } from './service/role-guard.service';
import { RegisterComponent } from './page/register/register.component';
import { ProfilComponent } from './page/profil/profil.component';


const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: 'index/:category',
    component: IndexComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'profil',
    component: ProfilComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'upload',
    component: EditRecipeComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'recipes/:azonosito',
    component: RecipeDetailsComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'dashboard/recipes',
    component: ListRecipeComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 'admin'
    }
  },
  {
    path: 'dashboard/recipes/new',
    component: EditRecipeComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 'admin'
    }
  },
  {
    path: 'dashboard/recipes/:id',
    component: EditRecipeComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 'admin'
    }
  },
  {
    path: 'dashboard/ingredients',
    component: ListIngredientComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 'admin'
    }
  },
  {
    path: 'dashboard/ingredients/new',
    component: EditIngredientComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 'admin'
    }
  },
  {
    path: 'dashboard/ingredients/:id',
    component: EditIngredientComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 'admin'
    }
  },
  {
    path: 'dashboard/messages',
    component: ListMessageComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 'admin'
    }
  },
  {
    path: 'dashboard/messages/new',
    component: EditMessageComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 'admin'
    }
  },
  {
    path: 'dashboard/messages/:id',
    component: EditMessageComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 'admin'
    }
  },
  {
    path: 'dashboard/users',
    component: ListUserComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 'admin'
    }
  },
  {
    path: 'dashboard/users/new',
    component: EditUserComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 'admin'
    }
  },
  {
    path: 'dashboard/users/:id',
    component: EditUserComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 'admin'
    }
  },
  {
    path: 'dashboard/menus',
    component: ListMenuComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 'admin'
    }
  },
  {
    path: 'dashboard/menus/new',
    component: EditMenuComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 'admin'
    }
  },
  {
    path: 'dashboard/menus/:id',
    component: EditMenuComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 'admin'
    }
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
