import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'jotai';
import { migrateLocalStorage } from './features/characterData.ts';

const root = createRoot(document.getElementById('root'));

try {
  migrateLocalStorage(localStorage);
  root.render(
    <StrictMode>
      <Provider>
        <App />
      </Provider>
    </StrictMode>
  );
} catch (error) {
  const message = error instanceof Error ? error.message : 'The saved character data could not be upgraded.';
  root.render(
    <main style={{ maxWidth: 640, margin: '15vh auto', padding: 24, fontFamily: 'sans-serif' }}>
      <h1>Character data is not compatible</h1>
      <p>{message}</p>
      <p>Your saved data has not been changed. Update the app or restore a compatible character backup.</p>
    </main>
  );
}
``;
