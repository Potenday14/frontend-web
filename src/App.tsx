import { Suspense } from "react";
import { Stack } from "./stackflow";

function App() {
  return (
    <div className="relative h-screen w-full max-w-container mx-auto border border-x-fuchsia-400">
      <Suspense fallback={<div />}>
        <Stack />;
      </Suspense>
    </div>
  );
}

export default App;
