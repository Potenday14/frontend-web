import { ActivityComponentType } from "@stackflow/react";
import { useQueryClient } from "@tanstack/react-query";
import { useFlow } from "../stackflow";
import TimeCircle from "../assets/time-circle.svg?react";
import Calorie from "../assets/calorie.svg?react";
import { useFetchRecommendation } from "../hooks/queries";
import ArrowUp from "../assets/arrow-up.svg?react";
import { useRef, useState } from "react";
import { cn } from "../components/utils";
import Screen from "../components/screen";
import { API_BASE_URL } from "../constants/feature";
type ResultsActivityParams = {
  id: number;
};

const ResultsActivity: ActivityComponentType<ResultsActivityParams> = ({
  params,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const flow = useFlow();
  const { data: recommendation } = useFetchRecommendation({
    recommendationId: params.id,
  });

  return (
    <Screen
      appBar={{ title: "레시피 추천 결과" }}
      onScroll={(e) => {
        setScrolled(e.currentTarget.scrollTop > 0);
      }}
    >
      <div className="relative p-4 h-full group" ref={containerRef}>
        <h1 className="sr-only">추천 결과</h1>

        <p className="text-lg bg-gray-50 py-6 px-4 rounded-xl result__reason">
          {recommendation.reason}
        </p>

        <div className="mt-[18px]">
          {recommendation.recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="grid grid-cols-12 gap-4 p-5 border border-gray-100 rounded-xl mt-4"
            >
              <div className="flex flex-col justify-between col-span-7">
                <div>
                  <h3 className="text-xl font-semibold line-clamp-2">
                    {recipe.name}
                  </h3>
                  <div className="mt-3 flex flex-col gap-1.5">
                    <dl className="flex gap-3 items-center">
                      <dt>
                        <TimeCircle />
                        <span className="sr-only">조리 시간</span>
                      </dt>
                      <dd className="text-sm">{recipe.time}분</dd>
                    </dl>
                    <dl className="flex gap-3 items-center">
                      <dt>
                        <Calorie />
                        <span className="sr-only">칼로리</span>
                      </dt>
                      <dd className="text-sm">{recipe.calories}kcal</dd>
                    </dl>
                  </div>
                </div>
                <button
                  className="rounded-full bg-gray-950 p-2.5 whitespace-nowrap text-xs text-white"
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
                          return fetch(`${API_BASE_URL}/recipes/${recipe.id}`, {
                            method: "GET",
                            headers: {
                              "Content-Type": "application/json",
                            },
                          }).then((res) => res.json());
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
      </div>
      <button
        className={cn(
          "fixed bottom-6 right-4 p-2 bg-gray-950 text-white rounded-full",
          scrolled ? "block" : "hidden"
        )}
        onClick={() => {
          containerRef.current?.parentElement?.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        <ArrowUp />
      </button>
    </Screen>
  );
};

export default ResultsActivity;
