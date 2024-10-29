import { CharacterPreview, HalfPageContainer } from './pages';
import React from 'react';
import { MainContainer } from './pages';

export const App = () => (
  <MainContainer>
    <CharacterPreview />
    <HalfPageContainer> Prava polovina</HalfPageContainer>
  </MainContainer>
);

export default App;
