import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './page-components/sidebar/sidebar.component';
import { NavbarComponent } from './page-components/navbar/navbar.component';
import { FooterComponent } from './page-components/footer/footer.component';
import { FilterPipe } from './pipe/filter.pipe';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToastrModule } from 'ngx-toastr';
import { PagiPipe } from './pipe/pagi.pipe';
import { SortPipe } from './pipe/sort.pipe';
import { SummaryPipe } from './pipe/summary.pipe';
import { PaginationComponent } from './pagination/pagination.component';
import { ChartsModule } from 'ng2-charts';
import { ShowLatestFivePipe } from './pipe/show-latest-five.pipe';
import { NumberhuPipe } from './pipe/numberhu.pipe';
import { LengthPipe } from './pipe/length.pipe';
import { ListRecipeComponent } from './list/list-recipe/list-recipe.component';
import { EditRecipeComponent } from './edit/edit-recipe/edit-recipe.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { IndexComponent } from './index/index.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { ListIngredientComponent } from './list/list-ingredient/list-ingredient.component';
import { EditIngredientComponent } from './edit/edit-ingredient/edit-ingredient.component';
import { EditMessageComponent } from './edit/edit-message/edit-message.component';
import { ListMessageComponent } from './list/list-message/list-message.component';
import { ListUserComponent } from './list/list-user/list-user.component';
import { EditUserComponent } from './edit/edit-user/edit-user.component';
import { UserBarChartComponent } from './charts/user-bar-chart/user-bar-chart.component';
import { RecipeBarChartComponent } from './charts/recipe-bar-chart/recipe-bar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    FilterPipe,
    DashboardComponent,
    PagiPipe,
    SortPipe,
    SummaryPipe,
    PaginationComponent,
    ShowLatestFivePipe,
    NumberhuPipe,
    LengthPipe,
    ListRecipeComponent,
    EditRecipeComponent,
    IndexComponent,
    RecipeDetailsComponent,
    ListIngredientComponent,
    EditIngredientComponent,
    EditMessageComponent,
    ListMessageComponent,
    ListUserComponent,
    EditUserComponent,
    UserBarChartComponent,
    RecipeBarChartComponent,

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ChartsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDividerModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
