import React from 'react';
import { Tooltip } from '@mui/material';

export const formatWithPlusSign = (abilityModifier: number) =>
  (abilityModifier ? (abilityModifier < 0 ? '' : '+') : '') + `${abilityModifier}`;

export const calculateAbilityModifier = (abilityScore: number): number => Math.floor((abilityScore - 10) / 2);

export const removeLeadingZeros = (value: string | number): string =>
  typeof value === 'string' ? value.replace(/^0+(?=\d)/, '') : removeLeadingZeros(value.toString());

// Export all localStorage items as a JSON object
export function exportLocalStorageToJSON(): void {
  const localStorageData: Record<string, string | null> = {};

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      localStorageData[key] = localStorage.getItem(key);
    }
  }

  console.log(JSON.stringify(localStorageData, null, 2));
  alert('Data exported to console as JSON!');
}

// Import JSON and store it into localStorage
export function importJSONToLocalStorage(): void {
  const jsonInput = prompt('Paste the JSON data to import:');

  if (!jsonInput) {
    alert('No JSON data provided!');
    return;
  }

  try {
    const data: Record<string, string> = JSON.parse(jsonInput);

    Object.entries(data).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });

    alert('Data imported into localStorage successfully!');
  } catch (error) {
    console.error('Invalid JSON input:', error);
    alert('Failed to import data. Please provide valid JSON!');
  }
}

const slides = ['Character Preview', 'Inventory'];

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
