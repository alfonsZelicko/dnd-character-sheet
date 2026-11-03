import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'jotai';
import { migrateLocalStorage } from './features/characterData.ts';

document.documentElement.setAttribute('spellcheck', 'false');

const root = createRoot(document.getElementById('root'));

const renderApp = () =>
  root.render(
    <StrictMode>
      <Provider>
        <App />
      </Provider>
    </StrictMode>
  );

const renderCompatibilityError = (error) => {
  const message = error instanceof Error ? error.message : 'The saved character data could not be upgraded.';
  root.render(
    <main style={{ maxWidth: 640, margin: '15vh auto', padding: 24, fontFamily: 'sans-serif' }}>
      <h1>Character data is not compatible</h1>
      <p>{message}</p>
      <p>Your saved data has not been changed. Update the app or restore a compatible character backup.</p>
    </main>
  );
};

const initializeApp = () => {
  try {
    migrateLocalStorage(localStorage);
    renderApp();
  } catch (error) {
    renderCompatibilityError(error);
  }
};

initializeApp();
``;
