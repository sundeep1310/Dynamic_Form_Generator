export type FieldType = 'text' | 'email' | 'select' | 'radio' | 'textarea' | 'number';

export type FieldOption = {
  value: string;
  label: string;
};

export type ValidationRule = {
  pattern?: string;
  message?: string;
  required?: boolean;
  min?: number;
  max?: number;
};

export type FormField = {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  placeholder?: string;
  options?: FieldOption[];
  validation?: ValidationRule;
};

export type FormSchema = {
  formTitle: string;
  formDescription: string;
  fields: FormField[];
};