import { useSuspenseQuery } from "@tanstack/react-query";
import {
  fetchCharacters,
  fetchIngredients,
  fetchRecipeRecommendation,
} from "../mock/api";

export function useFetchCharacters() {
  return useSuspenseQuery({
    queryKey: ["characters"],
    queryFn: fetchCharacters,
  });
}

export function useFetchIngredients({ word }: { word?: string } = {}) {
  return useSuspenseQuery({
    queryKey: ["ingredients", { word }],
    queryFn: () => fetchIngredients({ word }),
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
