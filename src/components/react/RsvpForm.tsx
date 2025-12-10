import type { Rsvp } from "../../db/schema";

import { useRef, useState } from "react";
import { useForm } from "@tanstack/react-form";

import FormError from "./FormError";

export default function RsvpForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm({
    defaultValues: {
      attending: true,
      name: "",
      email: "",
      phone: "",
      message: "",
      guest: false,
      guestName: "",
    } as Rsvp,
    validators: {
      onSubmit: ({ value }) => {
        const errors: Partial<Rsvp> = {};

        if (!value.name) {
          errors["name"] = "Name is required";
        }

        if (!value.email) {
          errors["email"] = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value.email)) {
          errors["email"] = "Email is invalid";
        }

        if (!value.phone) {
          errors["phone"] = "Phone is required";
        } else if (!/^\+?[1-9]\d{1,14}$/.test(value.phone)) {
          errors["phone"] = "Phone number is invalid";
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
        const result = await fetch("/api/rsvp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        });

        const data = await result.json();

        if (data.success) {
          setIsSubmitted(true);
        } else {
          alert("Error submitting form: " + (data.error || "Unknown error"));
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Error submitting form");
      }
    },
  });

  if (isSubmitted) {
    return (
      <div className="text-center h-full flex flex-col items-center justify-center pt-12 pb-8">
        <i className="ph-light ph-confetti text-8xl mb-4 text-base-content"></i>
        <h2 className="text-3xl font-bold mb-2">You're all set!</h2>
        <p className="text-lg">Thank you for taking the time to RSVP.</p>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-3xl mb-4">RSVP Form</h2>
      <form
        className="w-full"
        onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="flex flex-col gap-2 w-full text-left">
          <form.Field
            name="attending"
            children={field => (
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Will you be attending?</legend>
                <div className="grid grid-cols-2 max-w-1/2">
                  <label className="label text-base-content text-sm flex items-center gap-2">
                    <input
                      type="radio"
                      name="attending-radio"
                      className="radio radio-sm text-base-content"
                      checked={field.state.value === true}
                      onChange={e => field.handleChange(true)}
                    />
                    Yes
                  </label>
                  <label className="label text-base-content text-sm flex items-center gap-2">
                    <input
                      type="radio"
                      name="attending-radio"
                      className="radio radio-sm text-base-content"
                      checked={field.state.value === false}
                      onChange={e => field.handleChange(false)}
                    />
                    No
                  </label>
                </div>
              </fieldset>
            )}
          />
          <form.Field
            name="name"
            children={field => (
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Name*</legend>
                <input
                  id="name"
                  autoComplete="name"
                  name={field.name}
                  value={field.state.value}
                  className="input w-full"
                  onChange={e => field.handleChange(e.target.value)}
                  type="text"
                />
                <FormError
                  showError={!field.state.meta.isValid}
                  error={field.state.meta.errors.join(",")}
                />
              </fieldset>
            )}
          />
          <form.Field
            name="email"
            children={field => (
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Email*</legend>
                <input
                  id="email"
                  autoComplete="name"
                  name={field.name}
                  value={field.state.value}
                  className="input w-full"
                  onChange={e => field.handleChange(e.target.value)}
                  type="email"
                />
                <FormError
                  showError={!field.state.meta.isValid}
                  error={field.state.meta.errors.join(",")}
                />
              </fieldset>
            )}
          />
          <form.Field
            name="phone"
            children={field => (
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Phone*</legend>
                <input
                  id="phone"
                  autoComplete="tel"
                  name={field.name}
                  value={field.state.value}
                  className="input w-full"
                  onChange={e => field.handleChange(e.target.value)}
                  type="phone"
                />
                <FormError
                  showError={!field.state.meta.isValid}
                  error={field.state.meta.errors.join(",")}
                />
              </fieldset>
            )}
          />
          <form.Field
            name="guest"
            children={field => (
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Will you be bringing a guest?</legend>
                <div className="grid grid-cols-2 max-w-1/2">
                  <label className="label text-base-content text-sm flex items-center gap-2">
                    <input
                      type="radio"
                      name="guest-radio"
                      className="radio radio-sm text-base-content"
                      checked={field.state.value === true}
                      onChange={e => field.handleChange(true)}
                    />
                    Yes
                  </label>
                  <label className="label text-base-content text-sm flex items-center gap-2">
                    <input
                      type="radio"
                      name="guest-radio"
                      className="radio radio-sm text-base-content"
                      checked={field.state.value === false}
                      onChange={e => field.handleChange(false)}
                    />
                    No
                  </label>
                </div>
              </fieldset>
            )}
          />
          <form.Field
            name="guestName"
            validators={{
              onChangeListenTo: ["guest"],
            }}
            children={field =>
              field.form.getFieldValue("guest") && (
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Guest name*</legend>
                  <input
                    id="name"
                    autoComplete="name"
                    name={field.name}
                    value={field.state.value || ""}
                    className="input w-full"
                    onChange={e => field.handleChange(e.target.value)}
                    type="text"
                  />
                  <FormError
                    showError={!field.state.meta.isValid}
                    error={field.state.meta.errors.join(",")}
                  />
                </fieldset>
              )
            }
          />
          <form.Field
            name="message"
            children={field => (
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  Message (additional guests, dietary restrictions, etc.)
                </legend>
                <div className="relative w-full">
                  <textarea
                    id="message"
                    name={field.name}
                    className="textarea h-24 w-full pr-23"
                    onChange={e => field.handleChange(e.target.value)}
                  />
                </div>
                <div className="label">Optional</div>
              </fieldset>
            )}
          />
          <form.Subscribe
            selector={state => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <button type="submit" className="btn btn-accent mt-2" disabled={!canSubmit}>
                {isSubmitting ? <div className="loading loading-sm loading-spinner" /> : "Submit"}
              </button>
            )}
          />
        </div>
      </form>
    </>
  );
}
