import React from 'react';
import { Provider, createStore } from 'jotai';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { strengthAtom } from '../abilities/atoms';
import { proficiencyBonusAtom } from '../simple-components/atoms';
import { skillAtom } from './atoms';
import { SkillItem } from './SkillItem';

describe('SkillItem', () => {
  it('combines ability, proficiency, expertise, and manual modifiers', () => {
    const store = createStore();
    store.set(strengthAtom, { type: 'str', score: 16, proficiency: false });
    store.set(proficiencyBonusAtom, 3);
    store.set(skillAtom('Athletics'), { ability: 'str', modifier: 2, proficiencyAndExpertise: 2 });

    render(<Provider store={store}><SkillItem skillName="Athletics" /></Provider>);

    expect(screen.getByDisplayValue('+11')).toBeInTheDocument();
    expect(screen.getByText('Athletics')).toBeInTheDocument();
  });

  it('persists a changed manual modifier', () => {
    const store = createStore();
    store.set(skillAtom('Athletics'), { ability: 'str', modifier: 0, proficiencyAndExpertise: 0 });
    render(<Provider store={store}><SkillItem skillName="Athletics" /></Provider>);

    fireEvent.change(screen.getByPlaceholderText('+'), { target: { value: '4', name: 'modifier' } });

    expect(JSON.parse(localStorage.getItem('skill-athletics') ?? 'null').modifier).toBe(4);
  });
});
