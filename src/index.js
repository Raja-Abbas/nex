import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import Layout from "./components/layouts/Layout"
import { CreditProvider } from './context/CreditContext';
import { CardTitleProvider } from './context/CardTitleContext';
import { DeploymentProvider } from './context/DeploymentContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CreditProvider>
    <CardTitleProvider>
    <DeploymentProvider>
    <Layout>
    <App />
    </Layout>
    </DeploymentProvider>
    </CardTitleProvider>
    </CreditProvider>
  </React.StrictMode>
);


reportWebVitals();
