import { ActionError, defineAction } from "astro:actions";
import { z } from "astro/zod";
import { rsvp } from "@/db";
import { rsvpSchema } from "@/db/schema";
import { Resend } from "resend";

export const submitRsvp = defineAction({
  input: rsvpSchema.omit({ created: true }),
  handler: async input => {
    try {
      await rsvp.create(input);
      const resend = new Resend(process.env.RESEND_KEY!);
      await resend.emails
        .send({
          to: ["jkolenko@proton.me", "taydiaz2266@gmail.com"],
          subject: "New RSVP from " + input.name,
          template: {
            id: "new-rsvp",
            variables: {
              NAME: input.name,
              EMAIL_ADDRESS: input.email,
              PHONE: input.phone,
              ATTENDING: input.attending ? "Yes" : "No",
              GUEST: input.guest
                ? `Bringing a guest (${input.guestName || "No name provided"})`
                : "No guest",
              MESSAGE: input.message || "No message provided",
            },
          },
        })
        .catch(error => {
          console.error("Error sending email:", error);
          return { error };
        });

      return { success: true, value: null };
    } catch (error) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message: "Error submitting RSVP",
      });
    }
  },
});

export const getRsvps = defineAction({
  handler: async () => {
    try {
      return { success: true, value: await rsvp.getAll() };
    } catch (error) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message: "Error fetching RSVPs",
      });
    }
  },
});

export const deleteRsvp = defineAction({
  input: z.object({
    id: z.number(),
  }),
  handler: async ({ id }) => {
    try {
      await rsvp.delete(id);
      return { success: true, value: null };
    } catch (error) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message: "Error deleting RSVP",
      });
    }
  },
});

export const updateRsvp = defineAction({
  input: z.object({
    id: z.number(),
    data: rsvpSchema.partial(),
  }),
  handler: async ({ id, data }) => {
    try {
      await rsvp.update(id, data);
      return { success: true, value: null };
    } catch (error) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message: "Error updating RSVP",
      });
    }
  },
});
