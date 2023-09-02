/**
 * move-selection.js
 *
 * Moves selected text to left or right char by char
 */

nova.commands.register("moveSelection.moveSelectionLeft", (editor) => {
  const selectedRange = editor.selectedRange;
  if (selectedRange) {
    const startOffset = selectedRange.start;
    const endOffset = selectedRange.end;

    // Ensure the selection is not at the beginning of the document.
    if (startOffset > 0) {
      const textToMove = editor.getTextInRange(
        new Range(startOffset, endOffset)
      );
      editor.edit((edit) => {
        edit.delete(new Range(startOffset, endOffset));
        edit.insert(startOffset - 1, textToMove);
      });
      editor.addSelectionForRange(new Range(startOffset - 1, endOffset - 1));
    }
  }
});

nova.commands.register("moveSelection.moveSelectionRight", (editor) => {
  const selectedRange = editor.selectedRange;
  if (selectedRange) {
    const startOffset = selectedRange.start;
    const endOffset = selectedRange.end;

    // Ensure the selection is not at the end of the document.
    if (endOffset < editor.document.length) {
      const textToMove = editor.getTextInRange(
        new Range(startOffset, endOffset)
      );
      editor.edit((edit) => {
        edit.delete(new Range(startOffset, endOffset));
        edit.insert(startOffset + 1, textToMove);
      });
      editor.addSelectionForRange(new Range(startOffset + 1, endOffset + 1));
    }
  }
});
