import { Injectable } from '@angular/core';

export interface ITableColumn {
  key: string;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  apiUrl = 'http://localhost:3000/'

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
    { key: 'role', title: 'Jogosultság' },
  ]

  menuColumns: ITableColumn[] = [
    { key: 'name', title: 'Menü neve' },
    { key: 'soup', title: 'Leves' },
    { key: 'main', title: 'Főétel' },
    { key: 'salad', title: 'Saláta' },
    { key: 'dessert', title: 'Desszert' },
    { key: 'week', title: 'Érvényesség hete' },
  ]

  navigation: { label: string, href: string, icon: string, role: string }[] = [
    { label: 'Dashboard', href: '/dashboard', icon: 'insert_chart_outlined', role: 'admin' },
    { label: 'Receptek', href: '/dashboard/recipes', icon: 'menu_book', role: 'admin' },
    { label: 'Hozzávalók', href: '/dashboard/ingredients', icon: 'grain', role: 'admin' },
    { label: 'Menük', href: '/dashboard/menus', icon: 'list', role: 'admin' },
    { label: 'Üzenetek', href: '/dashboard/messages', icon: 'mail_outline', role: 'admin' },
    { label: 'Felhasználók', href: '/dashboard/users', icon: 'manage_accounts', role: 'admin' },
  ]

  constructor() { }
}
