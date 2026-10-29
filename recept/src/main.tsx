import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { applyA11ySettings, loadA11ySettings } from './lib/a11ySettings';
import './index.css';

applyA11ySettings(loadA11ySettings());

const root = document.getElementById('root');
if (!root) {
  throw new Error('Root element #root ontbreekt');
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
