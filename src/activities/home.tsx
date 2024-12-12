import { ActivityComponentType } from "@stackflow/react";
import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useFlow } from "../stackflow";
import FixedBottom from "../components/layout/fixed-bottom";
import Button from "../components/ui/button";

const HomeActivity: ActivityComponentType = () => {
  const { replace } = useFlow();

  return (
    <AppScreen>
      <FixedBottom
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
        className="flex flex-col items-center justify-center"
      >
        <div className="flex items-center flex-col gap-8 my-auto">
          <img src="/images/logo.png" width={375} height={163} alt="mood eat" />
          <img
            src="/images/loading.png"
            width={222}
            height={234}
            alt="loading"
          />
        </div>
      </FixedBottom>
    </AppScreen>
  );
};

export default HomeActivity;
