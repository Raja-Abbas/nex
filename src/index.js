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
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <CreditProvider>
        <CardTitleProvider>
          <DeploymentProvider>
            <Layout>
              <App />
            </Layout>
          </DeploymentProvider>
        </CardTitleProvider>
      </CreditProvider>
    </PersistGate>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
