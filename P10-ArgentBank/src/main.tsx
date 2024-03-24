import ReactDOM from "react-dom/client";
import AppRouter from "./AppRouter.tsx";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import store from "./redux/store.tsx";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </StrictMode>
);
