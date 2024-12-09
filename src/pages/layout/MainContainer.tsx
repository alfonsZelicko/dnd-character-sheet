import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { renderIndicator } from '../../features/utils';
import { PageContainer } from '../layout';
import { CharacterPreview } from '../preview';
import { Companion } from '../../components';

export const MainContainer = () => {
  const [currentSlide, setCurrentSlide] = useState(
    parseInt(new URLSearchParams(window.location.search).get('page') || '0')
  );

  const updateSlideInQuery = (index: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set('page', index.toString());
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  };

  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      showIndicators
      renderIndicator={renderIndicator}
      showArrows={false}
      autoPlay={false}
      swipeable={true}
      emulateTouch
      selectedItem={currentSlide}
      onChange={(index) => {
        setCurrentSlide(index);
        updateSlideInQuery(index);
      }}
    >
      <PageContainer>
        <CharacterPreview />
      </PageContainer>
      <PageContainer>
        <Companion />
      </PageContainer>
    </Carousel>
  );
};
