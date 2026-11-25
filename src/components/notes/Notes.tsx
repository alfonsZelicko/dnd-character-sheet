import React, { useEffect, useMemo } from 'react';
import { Box } from '@mui/material';
import { atom as createAtom, useAtom } from 'jotai';
import type { PrimitiveAtom } from 'jotai/vanilla/atom';
import type { SetStateAction } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Placeholder } from '@tiptap/extensions';
import { StyledPaper } from '../shared';
import { NoteProps } from './types';
import { mergeSx } from '../../utils';
import { getNotesSx } from './styles';

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Notes stored before the rich-text editor are plain text. Convert their line breaks
// to paragraphs so existing localStorage values remain readable after the upgrade.
const toEditorContent = (value: string) => {
  if (!value) return '';
  if (/<(p|strong|em|u|s|ul|ol|li|h[1-6]|blockquote|br)(\s|>|\/)/i.test(value)) return value;

  return value
    .split(/\r?\n/)
    .map((line) => `<p>${escapeHtml(line) || '<br>'}</p>`)
    .join('');
};

export function Notes({
  atom,
  arrayIndex,
  WrapperProps,
  rows = 5,
  placeholder = 'Some notes',
  fullWidth = true,
  disabled = false,
  multiline: _multiline,
  variant: _variant,
  id,
  'aria-label': ariaLabel,
}: NoteProps) {
  const textAtom = useMemo(() => {
    if (arrayIndex === undefined) return atom as PrimitiveAtom<string>;

    const arrayAtom = atom as PrimitiveAtom<string[]>;
    return createAtom(
      (get) => {
        const value: unknown = get(arrayAtom);
        if (Array.isArray(value)) return value[arrayIndex] ?? '';
        return typeof value === 'string' ? value : '';
      },
      (get, set, update: SetStateAction<string>) => {
        const storedValue: unknown = get(arrayAtom);
        const values: string[] = Array.isArray(storedValue)
          ? storedValue.slice()
          : [typeof storedValue === 'string' ? storedValue : ''];
        const currentValue = values[arrayIndex] ?? '';
        const value = typeof update === 'function' ? update(currentValue) : update;
        while (values.length <= arrayIndex) values.push('');
        values[arrayIndex] = value;
        if (!Array.isArray(storedValue) || !Object.is(storedValue[arrayIndex], value)) {
          set(arrayAtom, values);
        }
      }
    );
  }, [arrayIndex, atom]);
  const [value, setValue] = useAtom(textAtom);
  const rowCount = Number(rows);
  const extensions = useMemo(
    () => [StarterKit, Placeholder.configure({ placeholder: String(placeholder) })],
    [placeholder]
  );
  const editor = useEditor({
    extensions,
    content: toEditorContent(value),
    editable: !disabled,
    onUpdate: ({ editor: updatedEditor }) => setValue(updatedEditor.getHTML()),
    editorProps: {
      attributes: {
        ...(id ? { id } : {}),
        'aria-label': typeof ariaLabel === 'string' ? ariaLabel : String(placeholder),
        class: 'notes-editor-content',
        spellcheck: 'false',
      },
    },
    onBlur: ({ editor: blurredEditor }) => setValue(blurredEditor.getHTML()),
  });

  useEffect(() => {
    if (!editor) return;
    const nextContent = toEditorContent(value);
    if (editor.getHTML() !== nextContent) {
      editor.commands.setContent(nextContent, { emitUpdate: false });
    }
  }, [editor, value]);

  useEffect(() => {
    if (arrayIndex !== undefined) setValue((currentValue) => currentValue);
  }, [arrayIndex, setValue]);

  useEffect(() => {
    editor?.setEditable(!disabled);
  }, [disabled, editor]);

  return (
    <Box
      component={StyledPaper}
      {...WrapperProps}
      sx={mergeSx(getNotesSx(rowCount, fullWidth), { display: 'flex', flex: 1, height: '100%' }, WrapperProps?.sx)}
    >
      <Box className="notes-editor-frame">
        <EditorContent editor={editor} />
      </Box>
    </Box>
  );
}
