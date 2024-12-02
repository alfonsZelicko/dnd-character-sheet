import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { renderIndicator } from '../../features/utils';
import { PageContainer } from '../layout';
import { CharacterPreview } from '../preview';

export const MainContainer = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const updateSlideInQuery = (index: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set('page', index.toString());
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slideFromQuery = params.get('page');
    if (slideFromQuery) {
      const parsedSlide = parseInt(slideFromQuery, 10);
      if (!isNaN(parsedSlide)) {
        setCurrentSlide(parsedSlide);
      }
    }
  }, []);

  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      showIndicators
      renderIndicator={renderIndicator}
      showArrows={false}
      useKeyboardArrows
      autoPlay={false}
      swipeable
      emulateTouch
      selectedItem={currentSlide} // Nastavení aktuálního slidu
      onChange={(index) => {
        setCurrentSlide(index); // Aktualizace stavu
        updateSlideInQuery(index); // Uložení do URL
      }}
    >
      <PageContainer>
        <CharacterPreview />
      </PageContainer>
      <PageContainer>
        <></>
      </PageContainer>
    </Carousel>
  );
};
