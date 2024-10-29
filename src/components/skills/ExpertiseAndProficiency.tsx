import { ProfAndExpType, skillAtom, SkillsType } from './atoms';
import { useAtom } from 'jotai/index';
import React, { ChangeEvent, memo, useCallback, useRef } from 'react';
import { Checkbox, Tooltip } from '@mui/material';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import BookIcon from '@mui/icons-material/Book';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import SchoolIcon from '@mui/icons-material/School';

export const ExpertiseAndProficiency = memo(({ skillName }: { skillName: SkillsType }) => {
  const [{ proficiencyAndExpertise }, setSkill] = useAtom(skillAtom(skillName));

  const calcNextState = useCallback((prevProfAndExp: ProfAndExpType, { name, checked }: EventTarget & HTMLInputElement): ProfAndExpType => {
    let newProficiencyAndExpertise = prevProfAndExp;

    if (name === 'expertise') {
      newProficiencyAndExpertise = checked ? 2 : 1;
    } else {
      //name === 'proficiency'
      if (newProficiencyAndExpertise === 2) {
        newProficiencyAndExpertise = 1;
      } else {
        newProficiencyAndExpertise = checked ? 1 : 0;
      }
    }

    return newProficiencyAndExpertise;
  }, []);

  const handleChangeExpOrProf = (event: ChangeEvent<HTMLInputElement>) => {
    setSkill(prev => ({...prev, proficiencyAndExpertise: calcNextState(prev.proficiencyAndExpertise, event.target)}));
  };

  return (
    <>
      <Tooltip title={'proficiency'}>
        <Checkbox
          size={'small'}
          name={'proficiency'}
          icon={<BookOutlinedIcon />}
          checkedIcon={<BookIcon />}
          onChange={handleChangeExpOrProf}
          checked={proficiencyAndExpertise >= 1}
        />
      </Tooltip>
      <Tooltip title={'expertise'}>
        <Checkbox
          size={'small'}
          name={'expertise'}
          icon={<SchoolOutlinedIcon />}
          checkedIcon={<SchoolIcon />}
          onChange={handleChangeExpOrProf}
          checked={proficiencyAndExpertise === 2}
        />
      </Tooltip>
    </>
  );
});
