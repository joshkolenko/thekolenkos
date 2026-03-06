import { ActionError, defineAction } from "astro:actions";
import { Resend } from "resend";
import { z } from "astro/zod";

export const sendEmail = defineAction({
  input: z.object({
    to: z.array(z.string().email()),
    subject: z.string().optional(),
    template: z.object({
      id: z.string(),
      variables: z.record(z.string(), z.string()),
    }),
  }),
  handler: async ({ to, subject, template }) => {
    try {
      const resend = new Resend(process.env.RESEND_KEY!);

      const { data, error } = await resend.emails.send({
        to,
        subject,
        template,
      });

      if (error) {
        throw error;
      }

      return { success: true, value: data };
    } catch (error) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message: `Error sending email: ${error instanceof Error ? error.message : String(error)}`,
      });
    }
  },
});
