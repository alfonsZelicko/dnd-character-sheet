import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'jotai';
import {
  flushIndexedDbWrites,
  indexedDbCharacterStorage,
  initializeIndexedDbStorage,
  migrateCharacterStorage,
} from './features';

document.documentElement.setAttribute('spellcheck', 'false');

const root = createRoot(document.getElementById('root'));

const renderApp = (App) =>
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
    const { default: App } = await import('./App');
    renderApp(App);
  } catch (error) {
    renderCompatibilityError(error);
  }
};

void initializeApp();
