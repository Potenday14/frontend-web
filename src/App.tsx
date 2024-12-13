import { Suspense } from "react";
import { Stack } from "./stackflow";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/error-fallback";
function App() {
  return (
    <div className="relative h-svh w-full max-w-container mx-auto border border-x-fuchsia-400">
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense fallback={<div />}>
          <Stack />;
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
