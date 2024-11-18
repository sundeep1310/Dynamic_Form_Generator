import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders main title', () => {
    render(<App />);
    expect(screen.getByText('Dynamic Form Generator')).toBeInTheDocument();
  });

  it('renders both editor and preview sections', () => {
    render(<App />);
    expect(screen.getByTestId('monaco-editor')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Form Preview' })).toBeInTheDocument();
  });

  it('renders form fields from default schema', () => {
    render(<App />);
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Company Size/i)).toBeInTheDocument();
  });

  it('updates form when JSON is edited', async () => {
    render(<App />);
    const editor = screen.getByTestId('monaco-editor-textarea');
    
    const newSchema = {
      formTitle: "Test Form",
      formDescription: "Test Description",
      fields: [
        {
          id: "testField",
          type: "text",
          label: "Test Field",
          required: true,
          placeholder: "Test placeholder"
        }
      ]
    };

    fireEvent.change(editor, {
      target: { value: JSON.stringify(newSchema, null, 2) }
    });

    await waitFor(() => {
      expect(screen.getByText('Test Form')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
      expect(screen.getByLabelText(/Test Field/i)).toBeInTheDocument();
    });
  });
});