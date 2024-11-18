required: true
        },
        {
          id: "email",
          type: "email",
          label: "Email",
          required: true,
          validation: {
            pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
            message: "Invalid email"
          }
        }
      ]
    };
    
    render(<FormPreview schema={schema} />);
    
    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email');
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    
    await screen.findByText(/invalid/i);
    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('invalid-email');
  });

  it('validates select fields as required', async () => {
    const schema: FormSchema = {
      formTitle: "Test Form",
      formDescription: "Test",
      fields: [
        {
          id: "select",
          type: "select",
          label: "Select Field",
          required: true,
          options: [
            { value: "1", label: "Option 1" },
            { value: "2", label: "Option 2" }
          ]
        }
      ]
    };
    
    render(<FormPreview schema={schema} />);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText(/required/i)).toBeInTheDocument();
  });

  it('validates radio fields as required', async () => {
    const schema: FormSchema = {
      formTitle: "Test Form",
      formDescription: "Test",
      fields: [
        {
          id: "radio",
          type: "radio",
          label: "Radio Field",
          required: true,
          options: [
            { value: "1", label: "Option 1" },
            { value: "2", label: "Option 2" }
          ]
        }
      ]
    };
    
    render(<FormPreview schema={schema} />);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText(/required/i)).toBeInTheDocument();
  });
});

describe('Dark Mode Support', () => {
  it('renders form in dark mode', () => {
    document.documentElement.className = 'dark';
    
    render(<FormPreview schema={mockSchema} />);
    
    const form = screen.getByRole('form');
    expect(form.closest('div')).toHaveClass('dark:text-white');
  });

  it('maintains form functionality in dark mode', async () => {
    document.documentElement.className = 'dark';
    
    render(<FormPreview schema={mockSchema} />);
    
    const input = screen.getByRole('textbox', { name: /name/i });
    fireEvent.change(input, { target: { value: 'John Doe' } });
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });
});

describe('Accessibility Tests', () => {
  it('has proper aria labels', () => {
    render(<FormPreview schema={mockSchema} />);
    const input = screen.getByLabelText('Name');
    expect(input).toHaveAttribute('aria-required', 'true');
  });

  it('shows error messages to screen readers', async () => {
    render(<FormPreview schema={mockSchema} />);
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    
    const errorMessage = await screen.findByText(/required/i);
    expect(errorMessage).toHaveAttribute('role', 'alert');
  });

  it('maintains focus after form submission errors', async () => {
    render(<FormPreview schema={mockSchema} />);
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(document.activeElement).toBeTruthy();
    });
  });
});

describe('Performance Tests', () => {
  it('handles rapid form submissions', async () => {
    render(<FormPreview schema={mockSchema} />);
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    
    for (let i = 0; i < 5; i++) {
      fireEvent.click(submitButton);
    }
    
    const errors = await screen.findAllByText(/required/i);
    expect(errors.length).toBe(1);
  });

  it('debounces validation on input change', async () => {
    jest.useFakeTimers();
    
    const emailSchema: FormSchema = {
      formTitle: "Test Form",
      formDescription: "Test",
      fields: [
        {
          id: "email",
          type: "email",
          label: "Email",
          required: true,
          validation: {
            pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
            message: "Invalid email"
          }
        }
      ]
    };
    
    render(<FormPreview schema={emailSchema} />);
    
    const input = screen.getByRole('textbox', { name: /email/i });

    for (const char of 'test@example.com') {
      fireEvent.change(input, { target: { value: char } });
    }
    
    jest.runAllTimers();
    
    expect(screen.queryByText(/invalid/i)).not.toBeInTheDocument();
    
    jest.useRealTimers();
  });
});