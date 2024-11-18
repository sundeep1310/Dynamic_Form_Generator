import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormField } from './FormField';
import { Button } from '../ui/Button';
import { FormSchema } from '../../types/schema';

interface FormPreviewProps {
  schema: FormSchema;
}

export function FormPreview({ schema }: FormPreviewProps) {
  const [successMessage, setSuccessMessage] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = (data: any) => {
    console.log('Form submitted:', data);
    setSuccessMessage('Form submitted successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
    reset();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{schema.formTitle}</h1>
      <p className="text-gray-600 mb-6">{schema.formDescription}</p>
      
      {successMessage && (
        <div className="bg-green-50 text-green-700 p-4 rounded-md mb-4" role="alert">
          {successMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {schema.fields.map((field) => (
          <FormField
            key={field.id}
            field={field}
            register={register}
            error={errors[field.id]}
          />
        ))}
        
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
}