import React, { createContext, useContext, useEffect, useState } from 'react';
import { JsonEditor } from './components/form-generator/JsonEditor';
import { FormPreview } from './components/form-generator/FormPreview';
import { FormSchema } from './types/schema';
import { ErrorBoundary } from './components/ErrorBoundary';

type Theme = 'light' | 'dark';

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({
  theme: 'light',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.className = savedTheme;
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.className = 'dark';
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.className = newTheme;
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      aria-label="Toggle theme"
      data-testid="theme-toggle"
    >
      {theme === 'light' ? (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ) : (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )}
    </button>
  );
}

const DEFAULT_SCHEMA: FormSchema = {
  formTitle: "Project Requirements Survey",
  formDescription: "Please fill out this survey about your project needs",
  fields: [
    {
      id: "name",
      type: "text",
      label: "Full Name",
      required: true,
      placeholder: "Enter your full name"
    },
    {
      id: "email",
      type: "email",
      label: "Email Address",
      required: true,
      placeholder: "you@example.com",
      validation: {
        pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
        message: "Please enter a valid email address"
      }
    },
    {
      id: "companySize",
      type: "select",
      label: "Company Size",
      required: true,
      options: [
        { value: "1-50", label: "1-50 employees" },
        { value: "51-200", label: "51-200 employees" },
        { value: "201-1000", label: "201-1000 employees" },
        { value: "1000+", label: "1000+ employees" }
      ]
    },
    {
      id: "comments",
      type: "textarea",
      label: "Additional Comments",
      required: false,
      placeholder: "Any other details you'd like to share..."
    }
  ]
};

function AppContent() {
  const [schema, setSchema] = useState<FormSchema>(DEFAULT_SCHEMA);
  const [jsonError, setJsonError] = useState<string | null>(null);

  const handleJsonChange = (value: string | undefined) => {
    if (!value) return;
    
    try {
      const parsed = JSON.parse(value);
      if (!parsed.formTitle || !Array.isArray(parsed.fields)) {
        setJsonError('Invalid schema format. Must include formTitle and fields array.');
        return;
      }

      setSchema(parsed);
      setJsonError(null);
    } catch (error) {
      setJsonError((error as Error).message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-8 max-w-[1400px]">
        <ThemeToggle />
        <header className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Dynamic Form Generator
          </h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Edit the JSON schema on the left to generate a form preview on the right.
            Changes are reflected in real-time with instant validation.
          </p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <ErrorBoundary>
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden min-h-[600px] flex flex-col transition-colors">
              <div className="p-4 md:p-6 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  JSON Editor
                </h2>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  Edit the form schema with real-time validation and syntax highlighting
                </p>
              </div>
              <div className="flex-1 p-4">
                <JsonEditor 
                  initialValue={JSON.stringify(DEFAULT_SCHEMA, null, 2)}
                  onChange={handleJsonChange}
                  error={jsonError}
                />
              </div>
            </section>
          </ErrorBoundary>

          <ErrorBoundary>
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden min-h-[600px] flex flex-col transition-colors">
              <div className="p-4 md:p-6 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  Form Preview
                </h2>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  Live preview of your generated form with real-time updates
                </p>
              </div>
              <div className="flex-1 p-4 md:p-6 overflow-y-auto">
                <FormPreview schema={schema} />
              </div>
            </section>
          </ErrorBoundary>
        </div>

        <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            All changes are automatically saved and validated.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}