import React, { useEffect, useMemo } from 'react';
import { Box } from '@mui/material';
import { useAtom } from 'jotai';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
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
  WrapperProps,
  rows = 5,
  placeholder = 'Some notes',
  fullWidth = true,
  disabled = false,
  sx,
  multiline: _multiline,
  variant: _variant,
  id,
  'aria-label': ariaLabel,
}: NoteProps) {
  const [value, setValue] = useAtom(atom);
  const rowCount = Number(rows);
  const extensions = useMemo(
    () => [StarterKit, Underline, Placeholder.configure({ placeholder: String(placeholder) })],
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
    editor?.setEditable(!disabled);
  }, [disabled, editor]);

  return (
    <Box
      component={StyledPaper}
      {...WrapperProps}
      sx={mergeSx(getNotesSx(rowCount, fullWidth), WrapperProps?.sx, sx)}
    >
      <Box className="notes-editor-frame">
        <EditorContent editor={editor} />
      </Box>
    </Box>
  );
}
