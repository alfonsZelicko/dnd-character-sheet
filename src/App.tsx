import { CharacterPreview, HalfPageContainer, MainContainer } from './pages';
import React from 'react';

export const App = () => (
  <MainContainer>
    <CharacterPreview />
    <HalfPageContainer> Prava polovina</HalfPageContainer>
  </MainContainer>
);

export default App;
