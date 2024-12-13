export default function ErrorFallback() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl font-bold text-red-600">
        페이지에서 오류가 발생했습니다
      </h1>
      <p className="text-lg text-gray-500 mt-4">페이지를 새로고침 해주세요</p>
    </div>
  );
}
