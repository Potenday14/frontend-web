export type Character = {
  id: number;
  mood: "HAPPY" | "SAD" | "ANGRY";
  nickname: string;
  image: string;
};

export type Ingredient = {
  id: number;
  name: string;
};

export type IngredientWithQuantity = {
  quantity: number;
} & Ingredient;

export type Recipe = {
  id: number;
  name: string;
  ingredients: IngredientWithQuantity[];
  mainPhoto: string;
  manuals: {
    order: number;
    photo: string;
    description: string;
  }[];
  tip: string;
  reason: string;
  minutes: number;
  calories: number;
  carbohydrates: number;
  protein: number;
  fat: number;
  salt: number;
};

export type RecommendationRecipe = {
  id: number;
  name: string;
  mainPhoto: string;
  minutes: number;
  calories: number;
};

export type Recommendation = {
  reason: string;
  keywords: string[];
  recipes: RecommendationRecipe[];
};

export type CreateRecipeRecommendationRequest = {
  characterId: number;
  ingredients: Ingredient[];
  chatHistories: {
    role: "assistant" | "user";
    content: string;
  }[];
};
