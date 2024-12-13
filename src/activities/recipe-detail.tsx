import { ActivityComponentType } from "@stackflow/react";
import TimeCircle from "../assets/time-circle.svg?react";
import Screen from "../components/screen";
import { useFetchRecipe } from "../hooks/queries";
type RecipeActivityParams = {
  id: number;
};

const RecipeActivity: ActivityComponentType<RecipeActivityParams> = ({
  params,
}) => {
  const recipeId = params.id;
  const { data: recipe } = useFetchRecipe({ recipeId });

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
              <dd className="text-sm">{recipe.minutes} min</dd>
            </dl>
            <dl className="flex flex-col gap-3 items-center">
              <dt className="text-2xl font-semibold">kcal</dt>
              <dd className="text-sm">{recipe.calories}kcal</dd>
            </dl>
          </div>

          <p className="text-sm">{recipe.reason}</p>
        </div>
        {/* 재료 영역 */}
        <div className="border-t-8 border-gray-50">
          <h2 className="font-bold mt-6 mx-4">재료</h2>
          <ul className="mt-6">
            {recipe.ingredients.map((ingredient) => (
              <li
                key={ingredient.id}
                className="flex justify-between text-sm py-3 pl-4 pr-6 border-b border-gray-100"
              >
                <span>{ingredient.name}</span>
                <span>{ingredient.quantity}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* 조리법 영역 */}
        <div className="border-t-8 border-gray-50">
          <h2 className="font-bold mt-6 mx-4">조리과정</h2>
          <ul className="mt-6">
            {recipe.manuals.map((manual, index) => (
              <li
                key={index}
                className="flex justify-between py-3 px-4 flex-col"
              >
                <p className="text-sm">
                  {index + 1}. {manual.description}
                </p>
                <img
                  src={manual.photo}
                  alt={manual.description}
                  className="w-full object-cover rounded mt-2"
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="h-20"></div>
      </div>
    </Screen>
  );
};

export default RecipeActivity;
