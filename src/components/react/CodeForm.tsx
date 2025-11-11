import { useForm } from '@tanstack/react-form';

import FormError from './FormError';

export default function RsvpForm() {
  const form = useForm({
    defaultValues: {
      code: '',
    },
    validators: {
      onSubmitAsync: async ({ value }) => {
        try {
          const response = await fetch('/api/code', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(value),
          });

          const data = await response.json();

          if (data.success) {
            window.location.href = '/';
          } else {
            return {
              fields: { code: data.error || 'Invalid access code' },
            };
          }
        } catch (error) {
          return {
            fields: { code: 'Error submitting form' },
          };
        }
      },
    },
  });

  return (
    <form
      className="w-full"
      onSubmit={e => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div className="flex flex-col gap-3 w-full text-left">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="label">
            Access code
          </label>
          <form.Field
            name="code"
            children={field => (
              <>
                <input
                  id="name"
                  autoComplete="off"
                  autoCapitalize="off"
                  name={field.name}
                  value={field.state.value}
                  className="input input-border w-full"
                  onChange={e => field.handleChange(e.target.value)}
                  type="password"
                  required
                />
                <FormError
                  showError={!field.state.meta.isValid}
                  error={field.state.meta.errors.join(',')}
                />
              </>
            )}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Submit
        </button>
      </div>
    </form>
  );
}
