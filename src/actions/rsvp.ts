import { ActionError, defineAction } from "astro:actions";
import { z } from "astro/zod";
import { rsvp } from "@/db";
import { rsvpSchema } from "@/db/schema";

export const submitRsvp = defineAction({
  input: rsvpSchema,
  handler: async input => {
    try {
      await rsvp.create(input);
      return { success: true };
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
      const rsvps = await rsvp.getAll();
      return { rsvps };
    } catch (error) {
      return { error };
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
      return { success: true };
    } catch (error) {
      return { error };
    }
  },
});
