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
      return { value: await rsvp.getAll() };
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
      return { success: true };
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
      return { success: true };
    } catch (error) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message: "Error updating RSVP",
      });
    }
  },
});
