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
