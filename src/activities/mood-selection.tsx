import { ActivityComponentType } from "@stackflow/react";
import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useFlow } from "../stackflow";
import { EmblaCarousel } from "../components/carousel";
import { useEffect, useState } from "react";
import FixedBottom from "../components/layout/fixed-bottom";
import Button from "../components/ui/button";
import { useFetchCharacters } from "../hooks/queries";
import { useChatbot } from "../chat/chatbot";

const MoodSelectionActivity: ActivityComponentType = () => {
  const { data: characters } = useFetchCharacters();
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(
    null
  );
  const { push } = useFlow();
  const { startChat } = useChatbot();

  const handleStartChat = (characterId: number) => {
    startChat(characterId);
    push("ChatActivity", {
      characterId: characterId.toString(),
    });
  };

  useEffect(() => {
    if (selectedCharacter === null) {
      setSelectedCharacter(characters[0].id);
    }
  }, [setSelectedCharacter, characters, selectedCharacter]);

  return (
    <AppScreen appBar={{ title: "Mood Selection" }}>
      <FixedBottom
        bottom={
          <Button
            onClick={() => {
              if (selectedCharacter !== null) {
                handleStartChat(selectedCharacter);
              }
            }}
          >
            시작하기
          </Button>
        }
      >
        <div className="h-full flex flex-col justify-center gap-12">
          <h1 className="text-center text-xl font-semibold">
            오늘 기분을 선택하세요
          </h1>
          <EmblaCarousel
            characters={characters}
            onSelect={(index) => {
              setSelectedCharacter(characters[index].id);
            }}
          />
        </div>
      </FixedBottom>
    </AppScreen>
  );
};

export default MoodSelectionActivity;
