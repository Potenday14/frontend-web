import { ActivityComponentType } from "@stackflow/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchRecipe } from "../mock/api";
import TimeCircle from "../assets/time-circle.svg?react";
import Screen from "../components/screen";
type RecipeActivityParams = {
  id: number;
};

const RecipeActivity: ActivityComponentType<RecipeActivityParams> = ({
  params,
}) => {
  const recipeId = params.id;
  const { data: recipe } = useSuspenseQuery({
    queryKey: ["recipe", { recipeId }],
    queryFn: async () => {
      return fetchRecipe(recipeId);
    },
  });

  return (
    <Screen appBar={{ title: recipe.name }}>
      <img
        src={recipe.mainPhoto}
        alt={recipe.name}
        className="w-full aspect-square object-cover"
      />
      <div>
        <div className="p-4 flex flex-col gap-7">
          <h1 className="text-lg font-bold">{recipe.name}</h1>
          <div className="grid grid-cols-2 gap-3">
            <dl className="flex flex-col gap-3 items-center">
              <dt>
                <TimeCircle className="size-8" />
                <span className="sr-only">조리 시간</span>
              </dt>
              <dd className="text-sm">{recipe.time} min</dd>
            </dl>
            <dl className="flex flex-col gap-3 items-center">
              <dt className="text-2xl font-semibold">kcal</dt>
              <dd className="text-sm">{recipe.calories}kcal</dd>
            </dl>
          </div>

          <p className="text-sm">{recipe.tip}</p>
        </div>
        {/* 재료 영역 */}
        <div className="p-4 border-y-[6px] border-gray-50">
          <div className="flex gap-4">
            <h2 className="text-sm font-bold">[재료]</h2>
            <ul>
              {recipe.ingredients.main.map((ingredient) => (
                <li key={ingredient.name} className="flex gap-2">
                  <span>{ingredient.name}</span>
                  <span>{ingredient.quantity}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-5">
            {recipe.ingredients.sub.map((ingredient) => (
              <li key={ingredient.name} className="flex gap-2">
                <h2 className="text-sm font-bold">[{ingredient.name}]</h2>
                <ul>
                  {ingredient.data.map((data) => (
                    <li key={data.name} className="flex gap-2">
                      <span>{data.name}</span>
                      <span>{data.quantity}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </div>
        </div>
      </div>
    </Screen>
  );
};

export default RecipeActivity;
