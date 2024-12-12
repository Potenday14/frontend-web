import { useMutation } from "@tanstack/react-query";
import { createRecipeRecommendation } from "../mock/api";

export function useCreateRecipeRecommendation() {
  return useMutation({
    mutationFn: createRecipeRecommendation,
  });
}
