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

const renderLoading = (message) =>
  root.render(
    <main
      role="status"
      aria-live="polite"
      style={{
        alignItems: 'center',
        background: 'gray',
        boxSizing: 'border-box',
        color: '#222',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'sans-serif',
        gap: 16,
        height: '100dvh',
        justifyContent: 'center',
        left: 0,
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        width: '100vw',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          animation: 'app-loading-spin 0.8s linear infinite',
          border: '4px solid rgba(0, 0, 0, 0.2)',
          borderRadius: '50%',
          borderTopColor: '#222',
          height: 40,
          width: 40,
        }}
      />
      <style>{'@keyframes app-loading-spin { to { transform: rotate(360deg); } }'}</style>
      <span>{message}</span>
    </main>
  );

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
    renderLoading('Otevírám databázi postavy…');
    await initializeIndexedDbStorage();
    renderLoading('Kontroluji a upravuji uložená data…');
    migrateCharacterStorage(indexedDbCharacterStorage);
    renderLoading('Dokončuji ukládání dat…');
    await flushIndexedDbWrites();
    renderLoading('Spouštím aplikaci…');
    const { default: App } = await import('./App');
    renderApp(App);
  } catch (error) {
    renderCompatibilityError(error);
  }
};

void initializeApp();
