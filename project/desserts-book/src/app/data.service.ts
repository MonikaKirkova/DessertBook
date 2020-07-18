import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipes } from 'src/models/recipes';
import { ApiResponse } from 'src/models/api-response';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiUrl = 'https://api.spoonacular.com/recipes/random?apiKey=ca8bc88af82e4880a1c74153e041a05b&tags=dessert&number=99';
 // apiIngredientUrl = 'https://api.spoonacular.com/recipes/findByIngredients?apiKey=ca8bc88af82e4880a1c74153e041a05b&ingredients=';

  constructor(private http: HttpClient) {}
  getRecipes(){
    return this.http.get<ApiResponse>(this.apiUrl);
    //return this.http.get(this.apiUrl, this.apiOptions);
  }
  // getRecipesByIngredients(options){
  //   console.log(this.apiIngredientUrl + options)
  //   return this.http.get<ApiResponse>(this.apiIngredientUrl + options);
  // }
}
