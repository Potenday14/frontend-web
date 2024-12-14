import { ActivityComponentType } from "@stackflow/react";
import LoadingSpinner from "../components/loading-spinner";
import { Helmet } from "react-helmet";
import Screen from "../components/screen";

const ResultLoadingActivity: ActivityComponentType = () => {
  return (
    <Screen className="bg-gray-950">
      <Helmet>
        <title>결과를 불러오는 중...</title>
      </Helmet>
      <h1 className="sr-only">Loading...</h1>

      <div className="flex flex-col items-center gap-11 h-full justify-center mx-12">
        <img src="/images/loading.png" width={222} height={234} alt="loading" />

        <LoadingSpinner />

        <p className="text-xs text-center text-white">
          선택하신 2개의 재료가 모두 들어간 레시피가 없는 경우 1개의 재료가
          들어간 레시피가 나올 수 있습니다.
        </p>
      </div>
    </Screen>
  );
};

export default ResultLoadingActivity;
