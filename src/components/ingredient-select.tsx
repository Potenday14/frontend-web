import { Suspense, useState } from "react";
import { Ingredient } from "../mock/data";
import Button from "./ui/button";
import { cn } from "./utils";
import { useFetchIngredients } from "../hooks/queries";

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
  const [tempIngredients, setTempIngredients] = useState<Ingredient[]>([]);

  const selectedTotalIngredient =
    selectedIngredients.length + tempIngredients.length;

  return (
    <div className="p-4 flex-1 flex flex-col overflow-y-auto">
      <input
        type="text"
        placeholder="재료 검색"
        className="rounded-[10px] px-5 py-4 w-full bg-[#efe4cc] text-[#6d6d6d]"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {/* 재료 검색 결과 리스트 */}
      <Suspense fallback={<div className="h-full"></div>}>
        <IngredientList
          search={search}
          isSelected={(ingredient) => {
            return (
              tempIngredients.filter(
                (tempIngredient) => tempIngredient.id === ingredient.id
              ).length > 0 ||
              selectedIngredients.filter(
                (selectedIngredient) => selectedIngredient.id === ingredient.id
              ).length > 0
            );
          }}
          onSelect={(ingredient) => {
            if (
              tempIngredients.filter(
                (tempIngredient) => tempIngredient.id === ingredient.id
              ).length > 0
            ) {
              setTempIngredients(
                tempIngredients.filter(
                  (tempIngredient) => tempIngredient.id !== ingredient.id
                )
              );
              return;
            }
            if (
              selectedIngredients.filter(
                (selectedIngredient) => selectedIngredient.id === ingredient.id
              ).length > 0
            ) {
              setSelectedIngredients(
                selectedIngredients.filter(
                  (selectedIngredient) =>
                    selectedIngredient.id !== ingredient.id
                )
              );
              return;
            }
            if (selectedTotalIngredient >= 2) {
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
        재료 추가 ({selectedTotalIngredient}/2)
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
