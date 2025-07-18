import type { Rsvp } from '../db/schema';

import { useState } from 'react';
import { useForm } from '@tanstack/react-form';

import FormError from './FormError';

export default function RsvpForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      guests: '',
      attending: true,
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
      try {
        const result = await fetch('/api/rsvp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(value),
        });

        const data = await result.json();

        if (data.success) {
          setIsSubmitted(true);
        } else {
          alert('Error submitting form: ' + (data.error || 'Unknown error'));
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Error submitting form');
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

  if (isSubmitted) {
    return (
      <div className="text-center h-full flex flex-col items-center justify-center pt-12 pb-8">
        <i className="ph-light ph-confetti text-8xl mb-4"></i>
        <h2 className="text-3xl font-bold mb-2">You're all set!</h2>
        <p className="text-lg">Thank you for taking the time to RSVP.</p>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-xl font-bold mb-1">RSVP Form</h2>
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
                  <input
                    type="text"
                    onKeyDown={handleTagKeyDown}
                    className="input input-lg w-full"
                  />
                  {(field.state.value && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {field.state.value.split(',').map((guest, index) => (
                        <button
                          type="button"
                          key={index}
                          className="cursor-pointer badge badge-lg badge-primary"
                          onClick={() => removeGuest(guest)}
                        >
                          {guest}
                          <i className="ph-bold ph-x text-xs" />
                        </button>
                      ))}
                    </div>
                  )) || <span className="badge badge-ghost badge-lg mt-2">No guests</span>}
                </>
              )}
            />
          </div>
          <form.Field
            name="attending"
            children={field => (
              <>
                <label className="label mt-2 text-base-content">
                  <input
                    type="checkbox"
                    checked={field.state.value}
                    onChange={e => field.handleChange(e.target.checked)}
                    className="checkbox checkbox-neutral mr-1"
                  />
                  I will be attending the wedding
                </label>
              </>
            )}
          />
          <button type="submit" className="btn btn-lg btn-accent mt-2">
            {form.state.isSubmitting ? (
              <i className="ph-bold ph-spinner ph-spin mr-2" />
            ) : (
              <i className="ph-bold ph-check mr-2" />
            )}
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
