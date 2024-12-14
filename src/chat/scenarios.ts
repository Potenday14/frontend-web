export const moodMap: { [key: number]: "sad" | "angry" | "happy" } = {
  1: "happy",
  2: "angry",
  3: "sad",
};

export function getMoodName(moodId: number) {
  return moodMap[moodId];
}

export function getRecipeRecommendationMessage(moodId: number, step: number) {
  const mood = moodMap[moodId];
  const scenario = recipeRecommendationScenario;
  const currentStep = scenario.steps[step];
  const message = currentStep.message[mood] || currentStep.message.default;
  return {
    message: message.message,
    actions: currentStep.actions,
  };
}

export type RecipeRecommendationScenario = {
  id: string;
  steps: RecipeRecommendationStep[];
};

export type RecipeRecommendationStep = {
  message: {
    happy?: {
      message: string;
    };
    angry?: {
      message: string;
    };
    sad?: {
      message: string;
    };
    default: {
      message: string;
    };
  };
  actions: RecipeRecommendationAction[];
};

export type RecipeRecommendationAction =
  | {
      type: "button";
      label: string;
      action: string;
    }
  | {
      type: "text";
    };

export const recipeRecommendationScenario: RecipeRecommendationScenario = {
  id: "recipeRecommendation",
  steps: [
    {
      message: {
        happy: {
          message: "오늘은 무슨 일이 있었어? 좋은 일 생겼나? 너무 궁금해!",
        },
        angry: {
          message:
            "오늘은 무슨 일이 있었어? 힘들었지? 뭐 때문에 그런지 이야기해줘.",
        },
        sad: {
          message:
            "오늘은 무슨 일이 있었어? 마음이 많이 아프면 나한테 말해도 괜찮아.",
        },
        default: {
          message: "오늘은 무슨 일이 있었어? 어떤 일이든 나에게 이야기해줘.",
        },
      },
      actions: [
        {
          type: "text",
        },
      ],
    },
    {
      message: {
        happy: {
          message:
            "우와, 진짜 대단하다! 이렇게 좋은 소식이 있다니, 정말 기쁘겠다. 오늘 기분이 좋으니까 맛있는 거 만들어보는 건 어때? 좋아하는 재료가 있으면 너에게 맞는 레시피를 추천해줄게!",
        },
        angry: {
          message:
            "아, 그런 일이 있었구나. 정말 짜증나겠다. 기분이 나빠진 거 이해해. 맛있는 거라도 먹어서 기분 풀어야지. 좋아하는 재료가 있으면 너에게 맞는 레시피를 추천해줄게!",
        },
        sad: {
          message:
            "그런 일이 있었구나. 마음이 아프겠네. 힘들겠지만, 맛있는 거라도 만들어서 기분 전환해보자. 좋아하는 재료가 있으면 너에게 맞는 레시피를 추천해줄게!",
        },
        default: {
          message:
            "그런 일이 있었구나. 어떤 일이든 나에게 이야기해줘. 맛있는 거라도 만들어서 기분 전환해보자. 좋아하는 재료가 있으면 너에게 맞는 레시피를 추천해줄게!",
        },
      },
      actions: [
        {
          type: "button",
          label: "재료 선택",
          action: "ingredient-selection",
        },
      ],
    },
    {
      message: {
        default: {
          message:
            "선택한 재료가 맞아? 맞다면 요리 추천을 눌러줘. 아니라면 다시하기를 눌러.",
        },
      },
      actions: [
        { type: "button", label: "응, 맞아", action: "recommend" },
        { type: "button", label: "다시할래", action: "restart" },
      ],
    },
    {
      message: {
        default: {
          message: "재료를 다시 선택해주세요.",
        },
      },
      actions: [
        {
          type: "button",
          label: "재료 선택",
          action: "ingredient-selection",
        },
      ],
    },
  ],
};
