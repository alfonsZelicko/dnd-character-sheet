import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'jotai';
import { migrateCharacterStorage } from './features/characterData.ts';
import { flushIndexedDbWrites, indexedDbCharacterStorage, initializeIndexedDbStorage } from './features/indexedDbStorage.ts';

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
    <main style={{ fontFamily: 'sans-serif', margin: '15vh auto', maxWidth: 640, padding: 24 }}>
      <h1>Character data is not compatible</h1>
      <p>{message}</p>
      <p>Your saved data has not been changed. Update the app or restore a compatible character backup.</p>
    </main>
  );
};

const initializeApp = async () => {
  try {
    await initializeIndexedDbStorage();
    migrateCharacterStorage(indexedDbCharacterStorage);
    await flushIndexedDbWrites();
    renderApp();
  } catch (error) {
    renderCompatibilityError(error);
  }
};

void initializeApp();
``;
