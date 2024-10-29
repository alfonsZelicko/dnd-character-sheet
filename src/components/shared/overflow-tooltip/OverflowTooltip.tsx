import { useCallback, useLayoutEffect, useRef, useState } from 'react';

import { wrapperSx } from './styles';
import { OverflowTooltipProps } from './types';
import { Box, Tooltip } from '@mui/material';
import React from 'react';

export const OverflowTooltip = (props: OverflowTooltipProps) => {
  const { BoxProps, children, classes, maxWidth, title, ...restProps } = props;
  const { sx: boxSx, ...restBoxProps } = BoxProps ?? {};
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textElementRef = useRef<HTMLDivElement | null>(null);

  const compareSize = useCallback(() => {
    const element = textElementRef.current;

    if (element) {
      setIsOverflowing(element.scrollWidth > element.clientWidth);
    }
  }, []);

  useLayoutEffect(() => {
    const element = textElementRef.current;

    if (!element) return;

    const resizeObserver = new ResizeObserver(compareSize);

    resizeObserver.observe(element);
    compareSize();

    return () => resizeObserver.disconnect();
  }, [compareSize]);

  //it shows default tooltip, but if it is not defined (explicitly `undefined`) - it will show innerText of the children
  const displayedTitle = isOverflowing ? title || (title === undefined && textElementRef.current?.innerText) : null;

  return (
    <Tooltip title={displayedTitle} {...restProps}>
      <Box ref={textElementRef} sx={{...wrapperSx, maxWidth: maxWidth, ...boxSx}} {...restBoxProps}>
        {children}
      </Box>
    </Tooltip>
  );
};

const name: string = OverflowTooltip.name;
