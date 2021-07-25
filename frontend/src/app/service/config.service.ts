import { Injectable } from '@angular/core';

export interface ITableColumn {
  key: string;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  recipeColumns: ITableColumn[] = [
    { key: 'name', title: 'Recept neve' },
    { key: 'category', title: 'Kategória' },
    { key: 'difficulty', title: 'Nehézség' },
    { key: 'price_friendly', title: 'Pénztárcabarát' },
    { key: 'time_need', title: 'Időszükséglet' },
    { key: 'calory', title: 'Kalória' },
    { key: 'index', title: 'Index' },
  ]

  ingredientColumns: ITableColumn[] = [
    { key: 'name', title: 'Hozzávaló neve' },
    { key: 'unit', title: 'Mennyiségi egység' },
    { key: 'calory', title: 'Kalória' },
  ]

  messageColumns: ITableColumn[] = [
    { key: 'sender', title: 'Küldő neve' },
    { key: 'email', title: 'Küldő e-mail címe' },
    { key: 'subject', title: 'Üzenet tárgya' },
    { key: 'message', title: 'Üzenet tartalma' },
    { key: 'status', title: 'Státusz' },
  ]

  userColumns: ITableColumn[] = [
    { key: 'lastName', title: 'Vezetéknév' },
    { key: 'firstName', title: 'Keresztnév' },
    { key: 'nickName', title: 'Felhasználónév' },
    { key: 'email', title: 'email' },
    { key: 'countOfRecipes', title: 'Beküldött receptek száma' },
    { key: 'start', title: 'Tagság kezdete' },
  ]

  constructor() { }
}
