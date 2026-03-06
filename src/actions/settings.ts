import { ActionError, defineAction } from "astro:actions";
import { z } from "astro/zod";
import { settings } from "@/db";

export const getSettings = defineAction({
  handler: async () => {
    try {
      const allSettings = await settings.getAll();
      return { success: true, value: allSettings };
    } catch (error) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message: "Error fetching settings",
      });
    }
  },
});

export const getSetting = defineAction({
  input: z.object({
    key: z.string(),
  }),
  handler: async ({ key }) => {
    try {
      return { success: true, value: await settings.get(key) };
    } catch (error) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message: "Error fetching settings",
      });
    }
  },
});

export const setSetting = defineAction({
  input: z.object({
    key: z.string(),
    value: z.any(),
  }),
  handler: async ({ key, value }) => {
    try {
      await settings.set(key, value);
      return { success: true, value: null };
    } catch (error) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message: "Error updating settings",
      });
    }
  },
});
