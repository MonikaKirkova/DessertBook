import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  public selectedUser: User = {
    fullName: '',
    email: '',
    password: '',
    recipeNames: []
  };
  public noAuthenticationHeader = {headers: new HttpHeaders({NoAuth: 'True'})};
  constructor(private http: HttpClient) { }

  public postUser(user: User) {
    return this.http.post(environment.apiBaseUrl + '/users', user, this.noAuthenticationHeader);
  }

  public login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/login', authCredentials, this.noAuthenticationHeader);
  }

  public getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  }

  public addFavouriteRecipes(recipeNames) {
    console.log(recipeNames);
    return this.http.patch(environment.apiBaseUrl + '/addFavouriteRecipe', recipeNames);
  }

  public setToken(token: string) {
    localStorage.setItem('token', token);
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public deleteToken() {
    localStorage.removeItem('token');
  }

}
