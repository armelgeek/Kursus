import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ControlledTextInput } from '@/shared/components/molecules/form/ControlledTextInput';
import { useFormHandler } from '@/shared/hooks/use-form-handler';

import { Unit, UnitPayload } from '../../config/unit.type';
import { UnitFormSchema } from '../../config/unit.schema';

interface UnitFormProps {
  initialData: Partial<Unit> | null;
  onSubmit: (input: UnitPayload) => Promise<void>;
  onSuccess?: () => void;
}

export const UnitForm = ({ initialData = null, onSubmit, onSuccess }: UnitFormProps) => {
  const { form, handleSubmit, isSubmitting } = useFormHandler<UnitPayload>({
    schema: UnitFormSchema,
    initialValues: initialData || {
      name: ''
    },
    onSubmit,
    onSuccess
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <ControlledTextInput
            name="name"
            label="Name"
            placeholder="Unit Name"
            control={form.control}
          />

          <Button type="submit" className="mt-4" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : initialData ? (
              'Update Unit'
            ) : (
              'Create Unit'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}