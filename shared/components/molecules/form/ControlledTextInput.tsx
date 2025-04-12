import React, { ComponentProps } from 'react';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type ControlledTextInputProps<T extends FieldValues> = UseControllerProps<T> & {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'number'; // Ajout du type pour différencier les champs
} & ComponentProps<typeof Input>;

export function ControlledTextInput<T extends FieldValues>({
  name,
  label,
  placeholder,
  control,
  defaultValue,
  type = 'text',
  ...props
}: ControlledTextInputProps<T>) {
  const { field, fieldState } = useController<T>({
    control,
    name,
    defaultValue,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    field.onChange(type === 'number' ? (value === '' ? undefined : parseFloat(value)) : value);
  };

  return (
    <FormItem className="flex flex-col gap-1">
      {label && <FormLabel>{label}</FormLabel>}
      <FormControl>
        <Input
          {...props}
          type={type}
          onChange={handleChange}
          value={type === 'number' && field.value !== undefined ? field.value.toString() : field.value ?? ''}
          className={fieldState.error?.message && 'border-destructive'}
          placeholder={placeholder ?? ''}
        />
      </FormControl>
      {fieldState.error?.message && (
        <p className="text-xs my-1 text-red-500">{fieldState.error?.message}</p>
      )}
    </FormItem>
  );
}
