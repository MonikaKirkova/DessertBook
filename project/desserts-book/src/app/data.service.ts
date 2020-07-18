import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipes } from 'src/models/recipes';
import { ApiResponse } from 'src/models/api-response';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiUrl = 'https://api.spoonacular.com/recipes/random?apiKey=ca8bc88af82e4880a1c74153e041a05b&tags=dessert&number=99';

  constructor(private http: HttpClient) {}
  public getRecipes() {
    return this.http.get<ApiResponse>(this.apiUrl);
  }
}
