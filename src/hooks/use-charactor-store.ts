import { create } from "zustand";
import { Character } from "../mock/data";

interface CharacterStore {
  selectedCharacter: Character | null;
  setSelectedCharacter: (character: Character) => void;
}

export const useCharacterStore = create<CharacterStore>((set) => ({
  selectedCharacter: null,
  setSelectedCharacter: (character) => set({ selectedCharacter: character }),
}));
