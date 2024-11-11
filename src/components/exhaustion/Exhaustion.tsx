import { Box, Checkbox, styled } from '@mui/material';
import SentimentVerySatisfiedOutlinedIcon from '@mui/icons-material/SentimentVerySatisfiedOutlined';
import SentimentVerySatisfiedTwoToneIcon from '@mui/icons-material/SentimentVerySatisfiedTwoTone';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentSatisfiedAltTwoToneIcon from '@mui/icons-material/SentimentSatisfiedAltTwoTone';
import SentimentNeutralOutlinedIcon from '@mui/icons-material/SentimentNeutralOutlined';
import SentimentNeutralTwoToneIcon from '@mui/icons-material/SentimentNeutralTwoTone';
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import SentimentDissatisfiedTwoToneIcon from '@mui/icons-material/SentimentDissatisfiedTwoTone';
import SentimentVeryDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentVeryDissatisfiedOutlined';
import SentimentVeryDissatisfiedTwoToneIcon from '@mui/icons-material/SentimentVeryDissatisfiedTwoTone';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbDownAltTwoToneIcon from '@mui/icons-material/ThumbDownAltTwoTone';
import React, { ReactNode } from 'react';
import { useAtom } from 'jotai';

import { ComponentLabel, StyledPaper } from '../shared';
import { exhaustionAtom } from './atoms';

type IconList = { icon: ReactNode; checkedIcon: ReactNode };

const StyledCheckBox = styled(Checkbox)({
  paddingTop: 0,
  marginTop: 0,
});

const iconsList: IconList[] = [
  { icon: <SentimentVerySatisfiedOutlinedIcon />, checkedIcon: <SentimentVerySatisfiedTwoToneIcon /> },
  { icon: <SentimentSatisfiedAltOutlinedIcon />, checkedIcon: <SentimentSatisfiedAltTwoToneIcon /> },
  { icon: <SentimentNeutralOutlinedIcon />, checkedIcon: <SentimentNeutralTwoToneIcon /> },
  { icon: <SentimentDissatisfiedOutlinedIcon />, checkedIcon: <SentimentDissatisfiedTwoToneIcon /> },
  { icon: <SentimentVeryDissatisfiedOutlinedIcon />, checkedIcon: <SentimentVeryDissatisfiedTwoToneIcon /> },
  { icon: <ThumbDownAltOutlinedIcon />, checkedIcon: <ThumbDownAltTwoToneIcon /> },
];

export const Exhaustion = () => {
  const [exhaustion, setExhaustionLevel] = useAtom(exhaustionAtom);

  const handleCheckboxChange = (value: number) => {
    setExhaustionLevel((prev) => (prev === 1 && value === 1 ? 0 : value));
  };

  return (
    <Box sx={{ width: '100%', padding: '4px 0' }} component={StyledPaper}>
      {[1, 2, 3, 4, 5, 6].map((value, idx: number) => (
        <StyledCheckBox
          size={'small'}
          checked={value <= exhaustion}
          onChange={() => handleCheckboxChange(value)}
          icon={iconsList[idx].icon}
          checkedIcon={iconsList[idx].checkedIcon}
          key={idx}
        />
      ))}
      <ComponentLabel sx={{ display: 'block', fontSize: '15px', pr: 1 }}>Exhaust. level</ComponentLabel>
    </Box>
  );
};

/* <NumberLabelInput
        label={
          <>
            {[1, 2, 3, 4, 5, 6].map((value, idx: number) => (
              <StyledCheckBox
                size={'small'}
                checked={value <= exhaustion}
                onChange={() => handleCheckboxChange(value)}
                icon={iconsList[idx].icon}
                checkedIcon={iconsList[idx].checkedIcon}
                key={idx}
              />
            ))}
            <Typography textAlign={'right'} marginTop={-0.5} fontWeight={400}>
              Exhaustion level
            </Typography>
          </>
        }
        inputPlacement={'right'}
        NumberInputProps={{
          value: exhaustion,
          onChange: (event) => {
            setExhaustionLevel(+event.target.value > 6 ? 6 : +event.target.value < 0 ? 0 : +event.target.value);
          },
        }}
        StyledLabelProps={{ component: 'div', sx: { px: 1 } }}
      />
      */