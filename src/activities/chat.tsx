import { ActivityComponentType } from "@stackflow/react";
import { useEffect, useState } from "react";
import { useFlow } from "../stackflow";
import { useChatbot } from "../chat/chatbot";
import { cn } from "../components/utils";
import { createRecipeRecommendation } from "../mock/api";
import ArrowUp from "../assets/arrow-up.svg?react";
import { useFetchCharacters } from "../hooks/queries";
import Button from "../components/ui/button";
import Screen from "../components/screen";
type ChatParams = {
  characterId: string;
};

const ChatActivity: ActivityComponentType<ChatParams> = ({ params }) => {
  const { characterId } = params;
  const [input, setInput] = useState("");
  const chatbot = useChatbot();
  const flow = useFlow();
  const { data: characters } = useFetchCharacters();

  const lastMessage =
    chatbot.messages[chatbot.messages.length - 1] || undefined;
  const textInputAvailable =
    lastMessage?.type === "assistant" &&
    lastMessage.actions?.some((a) => a.type === "text");

  const selectedCharacter = characters.find(
    (c) => c.id === Number(characterId)
  );

  useEffect(() => {
    if (characterId && chatbot.messages.length === 0) {
      chatbot.startChat(Number(characterId));
    }
  }, [chatbot, characterId]);

  useEffect(() => {
    if (!params.characterId || !selectedCharacter) {
      flow.replace("MoodSelectionActivity", {});
    }
  });

  return (
    <Screen
      className={cn(
        "bg-no-repeat bg-cover bg-bottom",
        selectedCharacter?.mood === "HAPPY"
          ? "bg-chat-happy"
          : selectedCharacter?.mood === "SAD"
          ? "bg-chat-sad"
          : selectedCharacter?.mood === "ANGRY"
          ? "bg-chat-angry"
          : ""
      )}
      appBar={{ title: selectedCharacter?.mood }}
      bottomClassName="border-t border-gray-200 py-3"
      bottom={
        <form
          className="w-full flex items-center gap-[14px] bg-white"
          onSubmit={(e) => {
            e.preventDefault();
            if (!textInputAvailable) return;
            if (input === "") return;
            e.preventDefault();

            chatbot.respond(input);
            setInput("");
          }}
        >
          <input
            type="text"
            placeholder="채팅 입력"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            disabled={!textInputAvailable}
            className="rounded-[10px] bg-gray-50 px-5 py-3 w-full placeholder:text-gray-300 placeholder:text-sm text-sm"
          />
          <button
            type="submit"
            aria-label="Send message"
            className={cn(
              "rounded-[10px] p-2.5",
              selectedCharacter?.mood === "HAPPY"
                ? "bg-[#FF468A]"
                : selectedCharacter?.mood === "SAD"
                ? "bg-[#3F82DC]"
                : selectedCharacter?.mood === "ANGRY"
                ? "bg-[#FA361F]"
                : "bg-black"
            )}
          >
            <ArrowUp />
          </button>
        </form>
      }
    >
      <div className="flex gap-6 flex-col py-8 px-4 flex-1 overflow-y-auto">
        {chatbot.messages.map((m, i) => (
          <div
            key={i}
            className={cn(
              "p-3 rounded-t-2xl w-10/12",
              m.type === "assistant"
                ? "bg-white rounded-br-2xl border border-gray-200 mr-auto"
                : "bg-gray-50 rounded-bl-2xl ml-auto"
            )}
          >
            <p>{m.message}</p>
            {/* // rendering actions */}
            <div className="mt-3 flex gap-2">
              {m.type === "assistant" &&
                m.actions
                  ?.filter((a) => a.type === "button")
                  .map((a, j) => (
                    <ChatAction key={j} label={a.label} action={a.action} />
                  ))}
            </div>
          </div>
        ))}
      </div>
    </Screen>
  );
};

export default ChatActivity;

function ChatAction({ label, action }: { label: string; action: string }) {
  const chatbot = useChatbot();
  const flow = useFlow();
  if (action === "ingredient-selection") {
    return (
      <ChatActionButton
        onClick={() => flow.push("IngredientSelectionActivity", {})}
      >
        {label}
      </ChatActionButton>
    );
  }

  if (action === "recommend") {
    return (
      <ChatActionButton
        onClick={() => {
          if (!chatbot.characterId || chatbot.ingredients.length === 0) return;
          flow.push("ResultLoadingActivity", {});
          createRecipeRecommendation({
            characterId: chatbot.characterId,
            ingredients: chatbot.ingredients,
            chatHistories: chatbot.messages.slice(0, 2).map((m) => {
              return {
                role: m.type,
                content: m.message,
              };
            }),
          }).then(({ recommendationId }) => {
            flow.push("ResultsActivity", { id: recommendationId });
          });
        }}
      >
        {label}
      </ChatActionButton>
    );
  }

  if (action === "restart") {
    return (
      <ChatActionButton onClick={() => chatbot.respond("재료 다시 선택")}>
        {label}
      </ChatActionButton>
    );
  }
}

export function ChatActionButton({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"button">) {
  return (
    <Button
      className={cn(
        "py-2 px-1 w-full text-sm rounded-[4px] border border-gray-800 font-normal",
        className
      )}
      {...props}
    />
  );
}
