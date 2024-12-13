import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchRecipeRecommendation } from "../mock/api";

export type Character = {
  id: number;
  mood: "HAPPY" | "SAD" | "ANGRY";
  nickname: string;
  image: string;
};

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useFetchCharacters() {
  return useSuspenseQuery({
    queryKey: ["characters"],
    queryFn: () =>
      fetch(`${API_BASE_URL}/characters`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (res) => {
        const data = (await res.json()) as { characters: Character[] };
        return data.characters;
      }),
  });
}

export type Ingredient = {
  id: number;
  name: string;
};

export function useFetchIngredients({ word }: { word?: string } = {}) {
  const searchParams = new URLSearchParams();
  if (word) {
    searchParams.append("includes", word);
  }
  return useSuspenseQuery({
    queryKey: ["ingredients", { word }],
    queryFn: () =>
      fetch(`${API_BASE_URL}/ingredients?${searchParams.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (res) => {
        const data = (await res.json()) as { ingredients: Ingredient[] };
        return data.ingredients;
      }),
  });
}

export function useFetchRecommendation({
  recommendationId,
}: {
  recommendationId: number;
}) {
  return useSuspenseQuery({
    queryKey: ["recommendation", { recommendationId }],
    queryFn: async () => {
      return fetchRecipeRecommendation({ recommendationId });
    },
  });
}

export type Recipe = {
  id: number;
  name: string;
  ingredients: {
    id: number;
    name: string;
    quantity: string;
  }[];
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

export function useFetchRecipe({ recipeId }: { recipeId: number }) {
  return useSuspenseQuery({
    queryKey: ["recipe", { recipeId }],
    queryFn: async () => {
      return fetch(`${API_BASE_URL}/recipes/${recipeId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json() as Promise<Recipe>);
    },
  });
}
