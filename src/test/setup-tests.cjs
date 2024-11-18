const React = require('react');
require('@testing-library/jest-dom');

jest.mock('@monaco-editor/react', () => ({
  __esModule: true,
  default: function MonacoEditor(props) {
    return React.createElement(
      'div',
      { 
        'data-testid': 'monaco-editor',
        className: 'monaco-editor'
      },
      [
        React.createElement('h3', { 
          key: 'title',
          className: 'text-lg font-semibold mb-2'
        }, 'JSON Editor'),
        React.createElement('textarea', {
          key: 'textarea',
          'data-testid': 'monaco-editor-textarea',
          value: props.value,
          onChange: (e) => props.onChange?.(e.target.value),
          className: 'w-full h-[400px] font-mono text-sm p-2 border rounded'
        })
      ]
    );
  }
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }))
});