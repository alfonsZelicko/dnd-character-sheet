import React from 'react';
import { Tooltip } from '@mui/material';
import { createCharacterBackup, parseCharacterBackup, writeCharacterData } from './characterData';

export const formatWithPlusSign = (abilityModifier: number) =>
  (abilityModifier ? (abilityModifier < 0 ? '' : '+') : '') + `${abilityModifier}`;

export const calculateAbilityModifier = (abilityScore: number): number => Math.floor((abilityScore - 10) / 2);

export const removeLeadingZeros = (value: string | number): string =>
  typeof value === 'string' ? value.replace(/^0+(?=\d)/, '') : removeLeadingZeros(value.toString());


/*  ---- import/export helpers ---- */
export function exportLocalStorageToJSON(): void {
  const json = JSON.stringify(createCharacterBackup(), null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const date = new Date().toISOString().slice(0, 10);

  link.href = url;
  link.download = `dnd-character-sheet-${date}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

export async function importJSONFileToLocalStorage(file: File): Promise<void> {
  try {
    const data = parseCharacterBackup(await file.text());
    writeCharacterData(localStorage, data);

    window.location.reload();
  } catch (error) {
    console.error('Could not import character data:', error);
    alert(error instanceof Error ? `Import failed: ${error.message}` : 'Import failed. Please choose a valid JSON file.');
  }
}

const slides = ['Character Preview', 'Inventory'];


//TODO: imho this is no more usefull - remove it?
export const renderIndicator = (
  onClickHandler: (e: React.MouseEvent | React.KeyboardEvent) => void,
  isSelected: boolean,
  index: number
) => {
  const tooltipText = slides[index] || '';

  return (
    <Tooltip title={tooltipText} key={index} arrow>
      <div
        onClick={onClickHandler}
        onKeyDown={onClickHandler}
        role="button"
        tabIndex={0}
        style={{
          cursor: 'pointer',
          margin: '0 8px',
          padding: '5px',
          display: 'inline-block',
        }}
      >
        <span
          style={{
            transition: 'all 0.5s',
            width: '12px',
            height: '12px',
            backgroundColor: isSelected ? '#333' : '#ccc',
            borderRadius: '50%',
            display: 'inline-block',
          }}
        />
      </div>
    </Tooltip>
  );
};
