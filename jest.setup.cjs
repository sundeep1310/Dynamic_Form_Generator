require('@testing-library/jest-dom');

jest.mock('@monaco-editor/react', () => ({
  __esModule: true,
  default: ({ onChange, value }) => {
    return React.createElement('div', {
      'data-testid': 'monaco-editor',
      children: React.createElement('textarea', {
        onChange: (e) => onChange?.(e.target.value),
        value
      })
    });
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