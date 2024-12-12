import { ActivityComponentType } from "@stackflow/react";
import { AppScreen } from "@stackflow/plugin-basic-ui";
import LoadingSpinner from "../components/loading-spinner";

const ResultLoadingActivity: ActivityComponentType = () => {
  return (
    <AppScreen appBar={{ title: "My Activity" }}>
      <h1 className="sr-only">Loading...</h1>

      <div className="flex flex-col items-center gap-11 h-full justify-center mx-12">
        <img src="/images/loading.png" width={222} height={234} alt="loading" />

        <LoadingSpinner />

        <p className="text-xs text-center">
          선택하신 2개의 재료가 모두 들어간 레시피가 없는 경우 1개의 재료가
          들어간 레시피가 나올 수 있습니다.
        </p>
      </div>
    </AppScreen>
  );
};

export default ResultLoadingActivity;
