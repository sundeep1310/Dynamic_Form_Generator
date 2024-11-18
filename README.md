# Dynamic Form Generator

A powerful React application that generates dynamic forms from JSON schemas in real-time. Built with TypeScript, React Hook Form, and Tailwind CSS, this application offers a split-screen interface featuring a JSON editor and live form preview.

![Dynamic Form Generator]

## Features

### Core Functionality
- 🔄 Real-time form generation from JSON schema
- ✨ Syntax highlighting for JSON editing
- ✅ Instant JSON validation
- 📱 Responsive design (mobile-friendly)
- 🎨 Dark mode support
- 🛡️ Comprehensive error handling

### Form Features
- Multiple field types supported:
  - Text input
  - Email input
  - Select dropdown
  - Radio buttons
  - Textarea
- Form validation with error messages
- Real-time field validation
- Success messages after submission
- Console logging of form data

### Technical Features
- Built with TypeScript for type safety
- React Hook Form for form handling
- Monaco Editor for JSON editing
- Error boundaries for graceful error handling
- Jest unit tests
- Playwright E2E tests

## Getting Started

### Prerequisites
- Node.js (v16 or later)
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/dynamic-form-generator.git
cd dynamic-form-generator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage

### Basic Usage
1. Open the application in your browser
2. Edit the JSON schema in the left panel
3. Watch the form update in real-time on the right
4. Submit the form to see the data logged in the console

### Example JSON Schema
```json
{
  "formTitle": "User Registration",
  "formDescription": "Please fill out your details",
  "fields": [
    {
      "id": "name",
      "type": "text",
      "label": "Full Name",
      "required": true,
      "placeholder": "Enter your name"
    },
    {
      "id": "email",
      "type": "email",
      "label": "Email Address",
      "required": true,
      "validation": {
        "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
        "message": "Please enter a valid email"
      }
    }
  ]
}
```

### Field Types
- `text`: Basic text input
- `email`: Email input with validation
- `select`: Dropdown selection
- `radio`: Radio button group
- `textarea`: Multi-line text input

### Validation
- Required fields
- Email format validation
- Custom validation patterns
- Custom error messages

## Development

### Project Structure
```
src/
├── components/     # React components
├── lib/           # Utility functions
├── types/         # TypeScript types
└── test/          # Test configuration
```

### Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm test`: Run unit tests
- `npm run test:e2e`: Run E2E tests
- `npm run lint`: Run ESLint
- `npm run preview`: Preview production build

### Running Tests
```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:coverage
```

## Deployment
This application can be deployed to various platforms:

### Vercel
```bash
npm run build
vercel
```

### Netlify
```bash
npm run build
netlify deploy
```

## Technical Details

### Dependencies
- React 18
- TypeScript
- Tailwind CSS
- React Hook Form
- Monaco Editor
- Jest
- Playwright

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)


## Acknowledgments
- Built with [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Forms powered by [React Hook Form](https://react-hook-form.com/)
- Testing with [Jest](https://jestjs.io/) and [Playwright](https://playwright.dev/)
