import { ActivityComponentType } from "@stackflow/react";
import { useFlow } from "../stackflow";
import Button from "../components/ui/button";
import Screen from "../components/screen";
import { SITE_NAME } from "../constants/site";
import { Helmet } from "react-helmet";

const HomeActivity: ActivityComponentType = () => {
  return (
    <Screen
      className="flex flex-col items-center justify-center bg-home bg-no-repeat bg-cover bg-center"
      bottomClassName="bg-transparent"
    >
      <Helmet>
        <title>{SITE_NAME}</title>
        <link rel="canonical" href="https://moodeat.pages.dev" />
      </Helmet>
      <h1 className="sr-only">{SITE_NAME}</h1>

      <div className="fixed bottom-0 pt-2 pb-[29px] px-4 w-full flex flex-col">
        <StartButton />
      </div>
    </Screen>
  );
};

export default HomeActivity;

export function StartButton() {
  const { replace } = useFlow();
  return (
    <Button
      className="w-full"
      onClick={() => {
        replace("MoodSelectionActivity", {});
      }}
    >
      시작하기
    </Button>
  );
}
