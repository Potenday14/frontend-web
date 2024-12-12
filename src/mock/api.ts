import {
  Character,
  characters,
  Ingredient,
  ingredients,
  Recipe,
  recipeRecommendation,
  recipes,
  Recommendation,
} from "./data";

export const fetchCharacters = async (): Promise<Character[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(characters);
    }, 500);
  });
};

export const fetchIngredients = ({
  word,
}: { word?: string } = {}): Ingredient[] => {
  return ingredients.filter((ingredient) =>
    word ? ingredient.name.includes(word) : true
  );
};

type CreateRecipeRecommendationRequest = {
  characterId: number;
  ingredients: Ingredient[];
  chatHistories: {
    role: "assistant" | "user";
    content: string;
  }[];
};

export const createRecipeRecommendation = async (
  createRecipeRecommendationRequest: CreateRecipeRecommendationRequest
): Promise<{ recommendationId: number }> => {
  console.log(createRecipeRecommendationRequest);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        recommendationId: 1,
      });
    }, 3000);
  });
};

type FetchRecipeRecommendationRequest = {
  recommendationId: number;
};

export const fetchRecipeRecommendation = async ({
  recommendationId,
}: FetchRecipeRecommendationRequest): Promise<Recommendation> => {
  return new Promise((resolve) => {
    console.log(recommendationId);
    setTimeout(() => {
      resolve(recipeRecommendation);
    }, 500);
  });
};

export const fetchRecipe = async (recipeId: number): Promise<Recipe> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const recipe = recipes.find((recipe) => recipe.id === recipeId);
      if (recipe) {
        resolve(recipe);
      } else {
        throw new Error("Recipe not found");
      }
    }, 500);
  });
};
