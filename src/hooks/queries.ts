import { useSuspenseQuery } from "@tanstack/react-query";
import { Character, Recipe, Recommendation } from "../types";
import { API_BASE_URL } from "../constants/feature";

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
    queryFn: async () =>
      fetch(`${API_BASE_URL}/recipe-recommendations/${recommendationId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (res) => {
        return res.json() as Promise<Recommendation>;
      }),
  });
}

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
