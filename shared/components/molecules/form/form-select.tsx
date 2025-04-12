'use client';

import React from 'react';
import { Controller, Control } from 'react-hook-form';

export interface Option {
  label: string;
  value: string;
}

interface ControlledFormSelectProps {
  name: string;
  control: Control<any>;
  options: Option[];
  label?: string;
  placeholder?: string;
  error?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
}

export const ControlledFormSelect = ({
  name,
  control,
  options,
  label,
  placeholder = 'Select an option',
  error,
  className,
  disabled,
  required,
}: ControlledFormSelectProps) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <select
            {...field}
            disabled={disabled}
            className={`w-full px-3 py-2 text-sm rounded-md border shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-white ${
              disabled ? 'opacity-50 cursor-not-allowed' : ''
            } ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};
