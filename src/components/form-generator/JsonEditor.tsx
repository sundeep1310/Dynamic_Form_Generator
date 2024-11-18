import React from 'react';
import Editor from '@monaco-editor/react';
import { Button } from '../ui/Button';

interface JsonEditorProps {
  initialValue: string;
  onChange: (value: string | undefined) => void;
  error: string | null;
}

export function JsonEditor({ initialValue, onChange, error }: JsonEditorProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(initialValue);
  };

  return (
    <div className="relative">
      <div className="absolute right-2 top-2 z-10">
        <Button
          onClick={handleCopy}
          variant="outline"
          size="sm"
          className="gap-2 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
          Copy JSON
        </Button>
      </div>
      <Editor
        height="70vh"
        defaultLanguage="json"
        defaultValue={initialValue}
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: 'on',
          wrappingStrategy: 'advanced',
          formatOnPaste: true,
          formatOnType: true,
          scrollBeyondLastLine: false,
          lineNumbers: 'on',
          renderLineHighlight: 'all',
          autoClosingBrackets: 'always',
          matchBrackets: 'always',
          automaticLayout: true,
          tabSize: 2,
          theme: 'light'
        }}
      />
      {error && (
        <div className="mt-2 text-red-500 text-sm">
          Error: {error}
        </div>
      )}
    </div>
  );
}