import { Suspense, useState } from "react";
import Button from "./ui/button";
import { cn } from "./utils";
import { Ingredient, useFetchIngredients } from "../hooks/queries";
import { useDebounce } from "@uidotdev/usehooks";
import { MAX_SELECTED_INGREDIENT } from "../constansts/feature";
type IngredientSelectProps = {
  selectedIngredients: Ingredient[];
  setSelectedIngredients: (ingredients: Ingredient[]) => void;
  onSelect: () => void;
};

function IngredientSelect({
  selectedIngredients,
  setSelectedIngredients,
  onSelect,
}: IngredientSelectProps) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 100);
  const [tempIngredients, setTempIngredients] = useState<Ingredient[]>([]);

  const selectedTotalIngredient =
    selectedIngredients.length + tempIngredients.length;

  const isSelectedIngredient = (ingredient: Ingredient) => {
    return selectedIngredients.some(
      (selectedIngredient) => selectedIngredient.id === ingredient.id
    );
  };

  const isTempIngredient = (ingredient: Ingredient) => {
    return tempIngredients.some(
      (tempIngredient) => tempIngredient.id === ingredient.id
    );
  };

  return (
    <div className="p-4 flex-1 flex flex-col overflow-y-auto">
      <input
        type="text"
        placeholder="재료 검색"
        className="rounded-[10px] px-5 py-4 w-full bg-gray-50 placeholder:text-gray-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {/* 재료 검색 결과 리스트 */}
      <Suspense fallback={<div className="h-full"></div>}>
        <IngredientList
          search={debouncedSearch}
          isSelected={(ingredient) =>
            isSelectedIngredient(ingredient) || isTempIngredient(ingredient)
          }
          onSelect={(ingredient) => {
            if (isTempIngredient(ingredient)) {
              setTempIngredients(
                tempIngredients.filter(
                  (tempIngredient) => tempIngredient.id !== ingredient.id
                )
              );
              return;
            }
            if (isSelectedIngredient(ingredient)) {
              setSelectedIngredients(
                selectedIngredients.filter(
                  (selectedIngredient) =>
                    selectedIngredient.id !== ingredient.id
                )
              );
              return;
            }
            if (selectedTotalIngredient >= MAX_SELECTED_INGREDIENT) {
              return;
            }
            setTempIngredients([...tempIngredients, ingredient]);
          }}
        />
      </Suspense>
      <Button
        onClick={() => {
          const newIngredients = [...selectedIngredients, ...tempIngredients];

          setSelectedIngredients(
            newIngredients.filter(
              (ingredient, index) =>
                newIngredients.findIndex((i) => i.id === ingredient.id) ===
                index
            )
          );
          setTempIngredients([]);
          onSelect();
        }}
      >
        재료 추가 ({selectedTotalIngredient}/{MAX_SELECTED_INGREDIENT})
      </Button>
    </div>
  );
}

export default IngredientSelect;

type IngredientListProps = {
  search?: string;
  onSelect: (ingredient: Ingredient) => void;
  isSelected: (ingredient: Ingredient) => boolean;
};

function IngredientList({ search, onSelect, isSelected }: IngredientListProps) {
  const { data: ingredients } = useFetchIngredients({ word: search });

  return (
    <div className="overflow-y-auto mt-[22px] flex-1 h-full">
      {ingredients.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center h-full">
          <p className="text-center text-gray-400">
            검색하신 재료를 찾을 수 없습니다.
          </p>
        </div>
      )}
      {ingredients.map((ingredient) => {
        return (
          <button
            key={ingredient.id}
            className={cn(
              "rounded-lg p-2.5 h-[68px] flex items-center justify-between border border-[#d1d1d1] text-lg mt-3 w-full",
              isSelected(ingredient) && "border-[#3d3d3d] border-2"
            )}
            onClick={() => {
              onSelect(ingredient);
            }}
          >
            <span>{ingredient.name}</span>
          </button>
        );
      })}
    </div>
  );
}
