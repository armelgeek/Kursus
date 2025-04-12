'use client';

import React, { ComponentProps } from 'react';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { BaseService } from '@/shared/domain/base.service';
import { cn } from '@/shared/lib/utils';

import {
    FormControl,
    FormItem,
    FormLabel
} from '@/components/ui/form';

interface Entity {
    id: string | number;
    [key: string]: unknown;
}

interface Option {
    value: string;
    label: string;
}

export interface ControlledFkSelectProps<T extends FieldValues, E extends Entity> extends UseControllerProps<T> {
    service: Pick<BaseService<E, unknown>, 'list'>;
    getOptionLabel: (item: E) => string;
    getOptionValue?: (item: E) => string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
}

export function ControlledFkSelect<T extends FieldValues, E extends Entity>({
    name,
    control,
    service,
    getOptionLabel,
    getOptionValue = (item) => String(item.id),
    label,
    placeholder = 'Sélectionner...',
    disabled,
    required,
    defaultValue
}: ControlledFkSelectProps<T, E>) {
    const { field, fieldState } = useController<T>({
        control,
        name,
        defaultValue,
    });

    const queryKey = ['fk_' + name];
    const { data, isLoading } = useQuery({
        queryKey,
        queryFn: () => service.list({
            sortDir: 'asc'
        }),
    });

    const items = data?.data || [];

    const options: Option[] = items.map(item => ({
        value: getOptionValue(item),
        label: getOptionLabel(item),
    }));

    return (
        <FormItem className="flex flex-col gap-1">
            {label && <FormLabel>{label}{required && <span className="text-destructive ml-1">*</span>}</FormLabel>}
            <FormControl>
                <div className="relative">
                    <select
                        name={field.name}
                        value={field.value ?? ""}
                        onChange={(e) => {
                            const rawValue = e.target.value;
                            const parsedValue = /^\d+$/.test(rawValue) ? parseInt(rawValue, 10) : rawValue;
                            field.onChange(parsedValue);
                        }}
                        onBlur={field.onBlur}
                        ref={field.ref}
                        disabled={disabled || isLoading}
                        className={cn(
                            "w-full appearance-none px-3 py-2 pr-10 text-sm border rounded-md shadow-sm bg-background",
                            "focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring",
                            fieldState.error && "border-destructive focus:ring-destructive",
                            disabled && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        <option value="">{placeholder}</option>

                        {isLoading && <option disabled>Chargement...</option>}

                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>

                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <svg
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </div>
            </FormControl>


            {fieldState.error?.message && (
                <p className="text-xs my-1 text-destructive">{fieldState.error?.message}</p>
            )}
        </FormItem>
    );
}