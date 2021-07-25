import { Ingredient } from "./ingredient";

export class Recipe {
    _id: string = '';
    name: string = '';
    category: string = '';
    time_need: number = 0;
    difficulty: string = '';
    price_friendly: string = '';
    time_pre: number = 0;
    time_cooking: number = 0;
    degree: number = 0;
    index: number = 0;
    calory: number = 0;
    description: string[] = [];
    ingredients: string[] = [];
    ingredients_quantity: Number[] = [];
    ingredients_unit: string[] = [];
    img: string = '';
    story: string = '';
    portion: number = 0;
}
