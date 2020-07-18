import { Instructions } from './instructions';
import { Ingredients } from './ingredients';
import { AnalyzedInstructions } from './analyzed-instructions';

export class Recipes {
    title: string;
    readyInMinutes: number;
    image: string;
    analyzedInstructions: AnalyzedInstructions;
    summary: string;
    servings: number;
    glutenFree: boolean;
    vegan: boolean;
    extendedIngredients: Array<Ingredients>;
    //row_text: Array<string>[];
}
