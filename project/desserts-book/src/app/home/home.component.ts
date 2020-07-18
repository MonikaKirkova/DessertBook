import { Component, OnInit, ViewChild } from '@angular/core';
import { Recipes } from 'src/models/recipes';
import { DataService } from '../data.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatSelect } from '@angular/material';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('selectProducts', { static: true }) public select: MatSelect;

  title = 'desserts-book';
  public allRecipes: Array<Recipes>;
  public recipes: Array<Recipes>;
  public displayedColumns = ['title', 'readyInMinutes', 'servings', 'glutenFree', 'vegan', 'image', 'button', 'favourite'];
  public products = ['sugar', 'eggs', 'milk', 'flour', 'lemons', 'chocolate', 'cocoa powder', 'water', 'yoghurt', 'apples',
    'bananas', 'peach', 'pecans', 'butter', 'vanilla extract', 'cream', 'coconut flakes'];
  public selectedProducts = [];
  public favourites = [];

  constructor(private dataService: DataService, private dialog: MatDialog, private userService: UserService) { }

  public openDialog(element) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.data = element;
    this.dialog.open(DialogComponent, dialogConfig);
  }

  public ngOnInit() {

    return this.dataService.getRecipes().subscribe(data => {
      this.allRecipes = data.recipes;
      this.recipes = this.allRecipes;
    });
  }

  public changeSelection(evt) {
    this.selectedProducts = evt.value;
  }

  public filterRecipes(evt) {
    if (!evt) {
      this.recipes = [];

      this.allRecipes.forEach(recipe => {
        if (this.isRecipeIncluded(recipe)) {
          this.recipes.push(recipe);
        }
      });
    }
  }

  public isRecipeIncluded(recipe) {
    const ingredients = [];
    recipe.extendedIngredients.forEach(ingredient => {
      ingredients.push(ingredient.name);
    });

    if (this.containsAllIngredients(ingredients, this.selectedProducts)) {
      return true;
    } else {
      return false;
    }
  }

  public containsAllIngredients(recipeIngredients, availableIngredients) {
    for (const element of availableIngredients) {
      if (recipeIngredients.indexOf(element) === -1) {
        return false;
      }
    }
    return true;
  }

  public addToFavourites(element) {
    if (!this.favourites.includes(element.title)) {
      this.favourites.push(element.title);
      this.userService.addRecipes(this.favourites).subscribe(
        res => {
          console.log('Success');
        },
        err => {
          console.log(err);
        }
      );
    }
  }
}

