import type { Rsvp } from "@/db/schema";
import { useForm } from "@tanstack/react-form";
import { actions } from "astro:actions";
import { useState } from "react";
import FormError from "../FormError";

export default function MessageForm({ rsvps }: { rsvps: Rsvp[] }) {
  const [recipients, setRecipients] = useState<Rsvp[]>([]);

  const form = useForm({
    defaultValues: {
      message: "",
    },
    validators: {
      onSubmit: ({ value }) => {
        const errors: Partial<{ message: string }> = {};

        if (!value.message) {
          errors["message"] = "Message is required";
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
      const { error } = await actions.sendEmail({
        to: recipients.map(r => r.email),
        template: {
          id: "message",
          variables: {
            MESSAGE: value.message,
          },
        },
      });

      if (error) {
        form.setErrorMap({
          onSubmit: error.message,
        });

        return;
      }

      form.setFieldValue("message", "");
    },
  });

  return (
    <div className="mt-4 flex flex-col gap-4">
      <button
        className="btn btn-primary sm:mr-auto"
        onClick={() => document.querySelector<HTMLDialogElement>("#recipients-dialog")?.showModal()}
      >
        {recipients.length === 0 ? "Add recipients" : `Recipients (${recipients.length})`}
      </button>
      <dialog id="recipients-dialog" className="modal p-2">
        <div className="modal-box rounded-md max-h-full max-w-full">
          <form method="dialog">
            <button className="btn btn-sm btn-square btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">Recipients</h3>
          <div className="flex gap-2 my-4">
            <button
              className="btn btn-xs btn-primary"
              onClick={() => setRecipients(rsvps.filter(rsvp => rsvp.attending))}
            >
              Select all
            </button>
            <button className="btn btn-xs btn-secondary" onClick={() => setRecipients([])}>
              Deselect all
            </button>
          </div>
          <ul className="bg-base-100 rounded-box join-vertical max-h-90vh overflow-y-auto w-full">
            {rsvps
              .filter(rsvp => rsvp.attending)
              .map(rsvp => (
                <li key={rsvp.id} className="py-1">
                  <label className="label text-xs gap-2">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary checkbox-sm peer"
                      checked={recipients.some(r => r.id === rsvp.id)}
                      onChange={e => {
                        if (e.target.checked) {
                          setRecipients(prev => [...prev, rsvp]);
                        } else {
                          setRecipients(prev => prev.filter(r => r.id !== rsvp.id));
                        }
                      }}
                    />
                    <span className="peer-checked:text-neutral">
                      {rsvp.name} ({rsvp.email})
                    </span>
                  </label>
                </li>
              ))}
          </ul>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <form
        className="flex flex-col gap-4"
        onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="message"
          children={field => (
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Message</legend>
              <textarea
                id="message"
                name={field.name}
                value={field.state.value}
                className="textarea min-h-48 w-full"
                onChange={e => field.handleChange(e.target.value)}
              />
              <FormError
                showError={!field.state.meta.isValid}
                error={field.state.meta.errors.join(",")}
              />
            </fieldset>
          )}
        />
        <form.Subscribe
          selector={state => [
            state.errorMap.onSubmit,
            state.canSubmit,
            state.isSubmitting,
            state.values.message,
          ]}
          children={([onSubmitError, canSubmit, isSubmitting, message]) => (
            <>
              <button
                type="button"
                className="btn btn-primary sm:mr-auto"
                onClick={() =>
                  document.querySelector<HTMLDialogElement>("#send-dialog")?.showModal()
                }
                disabled={recipients.length === 0 || !message}
              >
                Send message
              </button>
              <dialog id="send-dialog" className="modal">
                <div className="modal-box rounded-md">
                  <form method="dialog">
                    <button className="btn btn-sm btn-square btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <h2 className="text-xl mb-4">Confirm send</h2>
                  <h3>
                    Are you sure you want to send this message to {recipients.length} recipients?
                  </h3>
                  <p className="my-4">{form.state.values.message}</p>
                  {typeof onSubmitError === "string" && (
                    <div className="text-error mt-2">{onSubmitError}</div>
                  )}
                  <button
                    type="submit"
                    className="btn btn-neutral mt-2 sm:mr-auto"
                    disabled={!canSubmit}
                  >
                    {isSubmitting ? (
                      <div className="loading loading-sm loading-spinner" />
                    ) : (
                      "Send message"
                    )}
                  </button>
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>
            </>
          )}
        />
      </form>
    </div>
  );
}
