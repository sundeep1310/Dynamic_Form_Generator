import React from 'react';

export function MockMonacoEditor({ value, onChange }: { value: string; onChange?: (value: string) => void }) {
  return (
    <div data-testid="monaco-editor" className="monaco-editor">
      <h3 className="text-lg font-semibold mb-2">JSON Editor</h3>
      <textarea
        data-testid="monaco-editor-textarea"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full h-[400px] font-mono text-sm p-2 border rounded"
      />
    </div>
  );
}