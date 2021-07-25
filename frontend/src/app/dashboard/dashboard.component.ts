import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RecipeService } from '../service/recipe.service';
import { UserService } from '../service/user.service';
import { Recipe } from '../model/recipe';
import { User } from '../model/user';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  indexPage = 1;
  pagiLength = 5;
  ArrayLength = 0;

  timer: number = 0;
  seconds: number = 0;

  // Recipe grafikonhoz.
  recipeList$: BehaviorSubject<Recipe[]> = this.recipeService.list$;
  recipeAmountArray: number[] = [];
  recipeIdArray: string[] = ['Desszert', 'Leves', 'Főzelék'];
  recipeBackgroundColorArray: string[] = [];
  recipes: number = 0;
  chartType: string = 'bar';
  desszert: number = 0
  leves: number = 0
  fozelek: number = 0


  // User grafikonhoz.
  userList$: BehaviorSubject<User[]> = this.userService.list$;
  userAmountArray: number[] = [];
  userIdArray: string[] = [];
  userBackgroundColorArray: string[] = [];

  constructor(
    private recipeService: RecipeService,
    private userService: UserService
  ) { }


  ngOnInit(): void {

    setInterval(() => {
      if (this.seconds == 60) {
        this.timer++;
        this.seconds = 0;
      }
      this.seconds += 1
    }, 1000);

    // Recipe grafikonhoz.
    this.recipeList$.subscribe(data => {
      this.recipes = data.length
      data.forEach(item => {
        switch (item.category) {
          case 'Desszert': this.desszert += 1; break;
          case 'Leves': this.leves += 1; break;
          case 'Főzelék': this.fozelek += 1; break;
        }
        this.recipeBackgroundColorArray.push(`rgb(${this.rgb()}, ${this.rgb()}, ${this.rgb()})`)
      });
      this.recipeAmountArray[0] = this.desszert
      this.recipeAmountArray[1] = this.leves
      this.recipeAmountArray[2] = this.fozelek
      console.log(this.desszert)
    });


    // User grafikonhoz.
    this.userList$.subscribe(data => {
      data.forEach(item => {
        this.userIdArray.push(item.nickName)
        this.userAmountArray.push(item.countOfRecipes)
        this.userBackgroundColorArray.push(`rgb(${this.rgb()}, ${this.rgb()}, ${this.rgb()})`);
      })
    })


    // this counts new  recipes
    this.recipeList$.subscribe(data => {
      data.forEach(item => {
        switch (item.category) {
          case 'Desszert':
          // this.accum_recipe += 1;
        }
      });
    });
  }

  onChartTypePie() {
    this.chartType = 'doughnut';
  }
  onChartTypeBar() {
    this.chartType = 'bar';
  }

  rgb(): number {
    return Math.floor((Math.random() * 255) + 1);
  }
}
