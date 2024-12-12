import { ActivityComponentType } from "@stackflow/react";
import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useQueryClient } from "@tanstack/react-query";
import { fetchRecipe } from "../mock/api";
import { useFlow } from "../stackflow";
import TimeCircle from "../assets/time-circle.svg?react";
import { useFetchRecommendation } from "../hooks/queries";
type ResultsActivityParams = {
  id: number;
};

const ResultsActivity: ActivityComponentType<ResultsActivityParams> = ({
  params,
}) => {
  const queryClient = useQueryClient();
  const flow = useFlow();
  const { data: recommendation } = useFetchRecommendation({
    recommendationId: params.id,
  });
  return (
    <AppScreen appBar={{ title: "레시피 추천 결과" }}>
      <div className="p-4">
        <h1 className="sr-only">추천 결과</h1>

        <p className="my-6 text-xl font-semibold">{recommendation.reason}</p>

        {recommendation.recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="grid grid-cols-12 gap-4 p-5 border border-[#b0b0b0] rounded-xl mt-4"
          >
            <div className="flex flex-col justify-between col-span-7">
              <div>
                <h3 className="text-xl font-semibold line-clamp-2">
                  {recipe.name}
                </h3>
                <dl className="flex gap-3 items-center">
                  <dt>
                    <TimeCircle />
                    <span className="sr-only">조리 시간</span>
                  </dt>
                  <dd className="text-xs">{recipe.time}분</dd>
                </dl>
              </div>
              <button
                className="rounded-full bg-[#e74e46] p-2.5 whitespace-nowrap text-xs text-white"
                onClick={async () => {
                  if (
                    !queryClient.getQueryData([
                      "recipe",
                      { recipeId: recipe.id },
                    ])
                  ) {
                    await queryClient.prefetchQuery({
                      queryKey: ["recipe", { recipeId: recipe.id }],
                      queryFn: async () => {
                        return fetchRecipe(recipe.id);
                      },
                    });
                  }
                  flow.push("RecipeActivity", { id: recipe.id });
                }}
              >
                전체 레시피 확인하기
              </button>
            </div>
            <img
              src={recipe.mainPhoto}
              alt={recipe.name}
              className="rounded-[20px] col-span-5 min-h-44 w-full object-cover"
            />
          </div>
        ))}
      </div>
    </AppScreen>
  );
};

export default ResultsActivity;
