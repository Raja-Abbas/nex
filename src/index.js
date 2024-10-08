import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./pages/App";
import reportWebVitals from "./reportWebVitals";
import Layout from "./components/layouts/Layout";
import { CreditProvider } from "./context/CreditContext";
import { CardTitleProvider } from "./context/CardTitleContext";
import { DeploymentProvider } from "./context/DeploymentContext";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { SlugProvider } from "./context/SlugContext";

const Loading = () => <div>Loading...</div>;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <SlugProvider>
          <CreditProvider>
            <CardTitleProvider>
              <DeploymentProvider>
                <Layout>
                  <App />
                </Layout>
              </DeploymentProvider>
            </CardTitleProvider>
          </CreditProvider>
        </SlugProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
