import { ActivityComponentType } from "@stackflow/react";
import { useFlow } from "../stackflow";
import Button from "../components/ui/button";
import Screen from "../components/screen";

const HomeActivity: ActivityComponentType = () => {
  const { replace } = useFlow();

  return (
    <Screen
      className="flex flex-col items-center justify-center"
      bottom={
        <Button
          className="w-full"
          onClick={() => {
            replace("MoodSelectionActivity", {});
          }}
        >
          시작하기
        </Button>
      }
    >
      <div className="flex items-center flex-col gap-8 my-auto">
        <img src="/images/logo.png" width={375} height={163} alt="mood eat" />
        <img src="/images/loading.png" width={222} height={234} alt="loading" />
      </div>
    </Screen>
  );
};

export default HomeActivity;
