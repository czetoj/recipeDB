import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../model/recipe';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService extends BaseService<Recipe> {

  constructor(
    public http: HttpClient
  ) {
    super(http);
    this.entity = 'recipes';
  }
}
