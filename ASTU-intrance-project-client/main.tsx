import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./src/component/App.tsx";
import { HistoryProvider } from "./src/component/HistoryContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HistoryProvider>
      <App />
    </HistoryProvider>
  </StrictMode>
);
