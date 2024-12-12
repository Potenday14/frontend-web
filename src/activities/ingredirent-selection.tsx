import { ActivityComponentType } from "@stackflow/react";
import { AppScreen } from "@stackflow/plugin-basic-ui";
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
import FixedBottom from "../components/layout/fixed-bottom";
import Star8 from "../assets/star-8.svg?react";
import IngredientSelect from "../components/ingredient-select";

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
    <AppScreen appBar={{ title: "재료 선택" }}>
      <FixedBottom
        bottom={
          <Button
            onClick={() => {
              chatbot.setIngredients(selectedIngredients);
              chatbot.respond(
                `선호 재료 선택 완료: ${selectedIngredients
                  .map((ingredient) => ingredient.name)
                  .join(", ")}`
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
          <p>* 1개 이상의 식재료를 선택해 주세요(최대 2개)</p>
          재료를 선택해주세요
          <div className="flex flex-col gap-3 mt-4">
            {selectedIngredients.map((ingredient) => (
              <div
                key={ingredient.id}
                className="rounded-lg p-2.5 h-[68px] flex items-center justify-between border border-[#d1d1d1] text-lg mt-3 w-full"
              >
                <span>{ingredient.name}</span>
                <button
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
                    className="py-3 px-1 rounded-xl border border-[#b0b0b0] w-full flex justify-center items-center"
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
      </FixedBottom>
    </AppScreen>
  );
};

export default IngredientSelectionActivity;
