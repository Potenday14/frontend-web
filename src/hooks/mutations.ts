import { useMutation } from "@tanstack/react-query";
import { CreateRecipeRecommendationRequest } from "../types";
import { API_BASE_URL } from "../constants/feature";

export function useCreateRecipeRecommendation() {
  return useMutation({
    mutationFn: (request: CreateRecipeRecommendationRequest) => {
      return fetch(`${API_BASE_URL}/recipe-recommendations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      }).then(async (res) => {
        return res.json() as Promise<{ recommendationId: number }>;
      });
    },
  });
}
