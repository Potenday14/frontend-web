import { create } from "zustand";
import { Ingredient } from "../mock/data";
import { getRecipeRecommendationMessage } from "./scenarios";

type MessageAction =
  | {
      type: "button";
      label: string;
      action: string;
    }
  | {
      type: "text";
    };

type Message =
  | {
      type: "assistant";
      message: string;
      actions?: MessageAction[];
    }
  | {
      type: "user";
      message: string;
    };

// const createFoodChatbot = (promptStyle: string): FoodChatbot => {
//   let step = 1;
//   let messages: Message[] = [
//     {
//       type: "assistant",
//       message: "어떤 맛이 땡기니?",
//     },
//   ];

//   const getStep = () => step;

//   const getMessages = () => messages;

//   const respond = (input: string): Message => {
//     if (step === 1) {
//       messages.push({ type: "user", message: input });
//       messages.push({
//         type: "assistant",
//         message: "어떤 재료가 있어?",
//       });
//       step = 2;
//     } else if (step === 2) {
//       messages.push({ type: "user", message: input });
//       messages.push({
//         type: "assistant",
//         message: `선택한 재료가 ${promptStyle}가 맞아? 맞다면 요리 추천을 눌러줘. 아니라면 다시하기를 눌러.`,
//         actions: [
//           { type: "button", label: "요리 추천", action: "recommend" },
//           { type: "button", label: "다시하기", action: "restart" },
//         ],
//       });
//       step = 3;
//     } else if (step === 3) {
//       if (input === "추천해줘") {
//         messages.push({ type: "user", message: input });
//         messages.push({
//           type: "assistant",
//           message: "추천된 요리는 떡볶이야.",
//         });
//         step = 4;
//       } else if (input === "재료 다시 선택") {
//         messages = [
//           {
//             type: "assistant",
//             message: "어떤 재료가 있어?",
//           },
//         ];
//         step = 2;
//       }
//     }
//     return messages[messages.length - 1];
//   };
// };
interface FoodChatbotStore {
  messages: Message[];
  step: number;
  setMessages: (messages: Message[]) => void;
  push: (...messages: Message[]) => void;
  setStep: (step: number) => void;
  characterId: number | null;
  setCharacterId: (characterId: number | null) => void;
  ingredients: Ingredient[];
  setIngredients: (ingredients: Ingredient[]) => void;
}

export const useChatbotStore = create<FoodChatbotStore>()((set) => ({
  messages: [],
  step: 0,
  setMessages: (messages) => set({ messages }),
  push: (...messages) =>
    set((state) => ({ messages: [...state.messages, ...messages] })),
  setStep: (step) => set({ step }),
  characterId: null,
  setCharacterId: (characterId) => set({ characterId }),
  ingredients: [],
  setIngredients: (ingredients) => set({ ingredients }),
}));

export const useChatbot = () => {
  const {
    setMessages,
    setStep,
    messages,
    step,
    push,
    characterId,
    setCharacterId,
    ingredients,
    setIngredients,
  } = useChatbotStore();

  const startChat = (characterId: number) => {
    setCharacterId(characterId);
    setIngredients([]);
    const message = getRecipeRecommendationMessage(characterId, 0);
    setMessages([
      {
        type: "assistant",
        message: message.message,
        actions: message.actions,
      },
    ]);
    setStep(1);
  };

  const respond = (input: string) => {
    if (!characterId) {
      return;
    }
    if (step === 1) {
      const message = getRecipeRecommendationMessage(characterId, 1);
      push(
        { type: "user", message: input },
        {
          type: "assistant",
          message: message.message,
          actions: message.actions,
        }
      );
      setStep(2);
    } else if (step === 2) {
      const message = getRecipeRecommendationMessage(characterId, 2);
      push(
        { type: "user", message: input },
        {
          type: "assistant",
          message: message.message,
          actions: message.actions,
        }
      );
      setStep(3);
    } else if (step === 3) {
      if (input === "추천해줘") {
        push(
          { type: "user", message: input },
          {
            type: "assistant",
            message: "레시피를 찾고 있어요!",
          }
        );
        setStep(4);
      } else if (input === "재료 다시 선택") {
        const message = getRecipeRecommendationMessage(characterId, 1);
        push({
          type: "assistant",
          message: message.message,
          actions: message.actions,
        });
        setStep(2);
      }
    }
  };

  return {
    messages,
    step,
    setMessages,
    setStep,
    respond,
    startChat,
    characterId,
    setCharacterId,
    ingredients,
    setIngredients,
  };
};
