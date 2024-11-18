import React from 'react';
import { FormField as FormFieldType } from '../../types/schema';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import { RadioGroup, RadioGroupItem } from '../ui/RadioGroup';

interface FormFieldProps {
  field: FormFieldType;
  register: any;
  error: any;
}

export function FormField({ field, register, error }: FormFieldProps) {
  const renderField = () => {
    const commonProps = {
      id: field.id,
      placeholder: field.placeholder,
      required: field.required,
      ...register(field.id, {
        required: field.required && 'This field is required',
        pattern: field.validation?.pattern
          ? {
              value: new RegExp(field.validation.pattern),
              message: field.validation.message,
            }
          : undefined,
      }),
    };

    switch (field.type) {
      case 'textarea':
        return <Textarea {...commonProps} />;
      
      case 'select':
        return (
          <Select {...commonProps}>
            <option value="">Select an option</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        );
      
      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={`${field.id}-${option.value}`}
                  value={option.value}
                  required={field.required}
                  {...register(field.id, { required: field.required })}
                  className="h-4 w-4"
                />
                <Label htmlFor={`${field.id}-${option.value}`}>{option.label}</Label>
              </div>
            ))}
          </div>
        );
      
      default:
        return <Input type={field.type} {...commonProps} />;
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={field.id}>
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {renderField()}
      {error && (
        <p className="text-sm text-red-500">
          {error.message || 'This field is required'}
        </p>
      )}
    </div>
  );
}