import ReactDOM from "react-dom/client";
import AppRouter from "./AppRouter.tsx";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.tsx";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "./components/Loading.tsx";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <AppRouter />
      </PersistGate>
    </Provider>
  </StrictMode>
);
