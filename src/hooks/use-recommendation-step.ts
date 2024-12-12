import { create } from "zustand";
import {
  메시지입력,
  모두입력됨,
  재료입력,
  캐릭터입력,
} from "../context/recommandation";

type UseRecommendationStore = {
  context: 캐릭터입력 | 메시지입력 | 재료입력 | 모두입력됨;
  setContext: (
    context: 캐릭터입력 | 메시지입력 | 재료입력 | 모두입력됨
  ) => void;
};

const useRecommendationStore = create<UseRecommendationStore>((set) => ({
  context: { step: "chooseCharacter" },
  setContext: (context) => set({ context }),
}));

export default useRecommendationStore;
