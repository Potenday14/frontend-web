import { ActivityComponentType } from "@stackflow/react";
import { useFlow } from "../stackflow";
import { useChatbot } from "../chat/chatbot";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer";
import Button from "../components/ui/button";
import type { Ingredient } from "../mock/data";
import { Suspense, useCallback, useState } from "react";
import Star8 from "../assets/star-8.svg?react";
import IngredientSelect from "../components/ingredient-select";
import Screen from "../components/screen";

const IngredientSelectionActivity: ActivityComponentType = () => {
  const chatbot = useChatbot();
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    chatbot.ingredients
  );
  const [open, setOpen] = useState(false);
  const { pop } = useFlow();

  const onSelect = useCallback(() => {
    setOpen(false);
  }, [setOpen]);
  return (
    <Screen
      appBar={{ title: "재료 선택하기" }}
      bottom={
        <Button
          onClick={() => {
            chatbot.setIngredients(selectedIngredients);
            setSelectedIngredients([]);
            chatbot.respond(
              `'${selectedIngredients
                .map((ingredient) => ingredient.name)
                .join("', '")}'이(가) 들어가면 좋겠어`
            );
            pop();
          }}
          disabled={selectedIngredients.length < 1}
        >
          입력 완료
        </Button>
      }
    >
      <div className="w-full h-full py-6 px-4">
        <h1 className="sr-only">재료 선택</h1>
        <h2>선호 재료</h2>
        <p className="text-gray-600 text-xs">
          * 1개 이상의 식재료를 선택해 주세요(최대 2개)
        </p>
        <div className="flex flex-col gap-3 mt-4">
          {selectedIngredients.map((ingredient) => (
            <div
              key={ingredient.id}
              className="rounded-xl py-4 px-2.5 flex items-center justify-between border border-gray-300 text-lg w-full h-16"
            >
              <span>{ingredient.name}</span>
              <button
                className="text-xs text-gray-300 h-full px-4"
                onClick={() => {
                  setSelectedIngredients(
                    selectedIngredients.filter(
                      (selectedIngredient) =>
                        selectedIngredient.id !== ingredient.id
                    )
                  );
                }}
              >
                삭제
              </button>
            </div>
          ))}

          <Drawer open={open} onOpenChange={setOpen}>
            {selectedIngredients.length < 2 && (
              <DrawerTrigger asChild>
                <button
                  aria-label="선호 재료 선택하기"
                  className="rounded-xl p-2.5 flex items-center justify-center border border-gray-300 text-lg w-full h-16"
                >
                  <Star8 />
                </button>
              </DrawerTrigger>
            )}
            <DrawerContent className="h-[80%]">
              <DrawerHeader>
                <DrawerTitle className="sr-only">
                  Are you absolutely sure?
                </DrawerTitle>
                <DrawerDescription className="sr-only">
                  This action cannot be undone.
                </DrawerDescription>
              </DrawerHeader>
              <Suspense fallback={<div>Loading...</div>}>
                <IngredientSelect
                  selectedIngredients={selectedIngredients}
                  setSelectedIngredients={setSelectedIngredients}
                  onSelect={onSelect}
                />
              </Suspense>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </Screen>
  );
};

export default IngredientSelectionActivity;
