'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ControlledFormSelect as FormSelect } from './form-select';
import { FormDatePicker } from './form-date-picker';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  age: z.number().min(18, 'Must be at least 18 years old'),
  role: z.string().min(1, 'Please select a role'),
  startDate: z.date(),
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }).refine(data => data.from <= data.to, {
    message: "End date cannot be before start date",
    path: ["to"],
  }).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const roleOptions = [
  { label: 'Admin', value: 'admin' },
  { label: 'User', value: 'user' },
  { label: 'Editor', value: 'editor' },
];

interface FormWithValidationProps {
  onSubmit: (data: FormValues) => void;
  defaultValues?: Partial<FormValues>;
  className?: string;
}

export const FormWithValidation: React.FC<FormWithValidationProps> = ({
  onSubmit,
  defaultValues,
  className,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      age: undefined,
      role: '',
      startDate: undefined,
      dateRange: undefined,
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <Input
            {...register('name')}
            type="text"
            className={errors.name && 'border-red-500'}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <Input
            {...register('email')}
            type="email"
            className={errors.email && 'border-red-500'}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Age <span className="text-red-500">*</span>
          </label>
          <Input
            {...register('age', { valueAsNumber: true })}
            type="number"
            className={errors.age && 'border-red-500'}
          />
          {errors.age && (
            <p className="mt-1 text-sm text-red-500">{errors.age.message}</p>
          )}
        </div>

        <FormSelect
          name="role"
          control={control}
          options={roleOptions}
          label="Role"
          required
          error={errors.role?.message}
        />

        <FormDatePicker
          name="startDate"
          control={control}
          label="Start Date"
          required
          error={errors.startDate?.message}
        />

        <FormDatePicker
          name="dateRange"
          control={control}
          label="Date Range"
          mode="range"
          error={errors.dateRange?.message}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
    </form>
  );
};
