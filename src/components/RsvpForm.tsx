import type { Rsvp } from '../db/schema';

import { useForm } from '@tanstack/react-form';

import FormError from './FormError';

export default function RsvpForm() {
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      guests: '',
    } as Rsvp,
    validators: {
      onSubmit: ({ value }) => {
        const errors: Partial<Rsvp> = {};

        if (!value.name) {
          errors['name'] = 'Name is required';
        }

        if (!value.email) {
          errors['email'] = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(value.email)) {
          errors['email'] = 'Email is invalid';
        }

        if (!value.phone) {
          errors['phone'] = 'Phone is required';
        } else if (!/^\+?[1-9]\d{1,14}$/.test(value.phone)) {
          errors['phone'] = 'Phone number is invalid';
        }

        if (Object.keys(errors).length) {
          return {
            fields: errors,
          };
        }

        return undefined;
      },
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      alert('This form is not functional yet. It is just a demo. :)');
      return;
      try {
        await fetch('/api/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(value),
        });

        alert('Form submitted successfully!');
      } catch (error) {
        alert('Error submitting form: ' + error);
      }
    },
  });

  function removeGuest(guest: string) {
    form.setFieldValue('guests', prev => {
      const currentGuests = prev ? prev.split(',').map(g => g.trim()) : [];
      const updatedGuests = currentGuests.filter(g => g !== guest.trim());
      return updatedGuests.join(', ');
    });
  }

  function handleTagKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const input = e.currentTarget;
      const value = input.value.replace(/,/g, '').trim();
      if (!value) return;

      if (value) {
        form.setFieldValue('guests', prev => {
          const currentGuests = prev ? prev.split(',').map(g => g.trim()) : [];
          return [...currentGuests, value].join(', ');
        });

        input.value = '';
      }
    }
  }

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
        <span className="my-2 text-sm text-base-content/60">* Required field</span>
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="label">
            Name*
          </label>
          <form.Field
            name="name"
            children={field => (
              <>
                <input
                  id="name"
                  autoComplete="name"
                  name={field.name}
                  value={field.state.value}
                  className="input input-lg w-full"
                  onChange={e => field.handleChange(e.target.value)}
                  type="text"
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
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="label">
            Email*
          </label>
          <form.Field
            name="email"
            children={field => (
              <>
                <input
                  id="email"
                  autoComplete="name"
                  name={field.name}
                  value={field.state.value}
                  className="input input-lg w-full"
                  onChange={e => field.handleChange(e.target.value)}
                  type="email"
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
        <div className="flex flex-col gap-1">
          <label htmlFor="phone" className="label">
            Phone*
          </label>
          <form.Field
            name="phone"
            children={field => (
              <>
                <input
                  id="phone"
                  autoComplete="tel"
                  name={field.name}
                  value={field.state.value}
                  className="input input-lg w-full"
                  onChange={e => field.handleChange(e.target.value)}
                  type="phone"
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
        <div className="flex flex-col gap-1">
          <label htmlFor="phone" className="label">
            Guests
          </label>
          <span className="text-sm text-base-content/60">
            Press enter to add a guest, click guest to remove
          </span>
          <form.Field
            name="guests"
            children={field => (
              <>
                <input type="text" onKeyDown={handleTagKeyDown} className="input input-lg w-full" />
                {field.state.value && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {field.state.value.split(',').map((guest, index) => (
                      <button
                        type="button"
                        key={index}
                        className="cursor-pointer badge badge-lg badge-neutral"
                        onClick={() => removeGuest(guest)}
                      >
                        {guest}
                        <i className="ph-bold ph-x text-xs" />
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          />
        </div>
        <button type="submit" className="btn btn-lg btn-neutral mt-2">
          Submit
        </button>
      </div>
    </form>
  );
}
