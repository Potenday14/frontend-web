// {
// 	"characterId": 1,
// 	"ingredients": [
// 		{"id": 1, "name": "쌀"},
// 		{"id": 2, "name": "돼지고기"}
// 	],
// 	"chatHistories": [
// 		{
// 			"type": "assistant"
// 			"message": "어떤 맛이 땡기니?"
// 		},{
// 			"type": "user"
// 			"message": "매운맛"
// 		}
// 	]
// }

export type 캐릭터입력 = {
  step: "chooseCharacter";
  characterId?: number;
  chatHistories?: { type: "assistant" | "user"; message: string }[];
  ingredients?: { id: number; name: string }[];
};

export type 메시지입력 = {
  step: "inputSentence";
  characterId: number;
  chatHistories?: { type: "assistant" | "user"; message: string }[];
  ingredients?: { id: number; name: string }[];
};

export type 재료입력 = {
  step: "inputIngredients";
  characterId: number;
  chatHistories: { type: "assistant" | "user"; message: string }[];
  ingredients?: { id: number; name: string }[];
};

export type 모두입력됨 = {
  step: "allInputDone";
  characterId: number;
  chatHistories: { type: "assistant" | "user"; message: string }[];
  ingredients: { id: number; name: string }[];
};
