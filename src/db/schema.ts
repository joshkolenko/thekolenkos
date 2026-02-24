import { z } from "astro/zod";
import { boolean, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const rsvpTable = pgTable("rsvp", {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  phone: varchar({ length: 255 }).notNull(),
  message: varchar({ length: 2000 }),
  attending: boolean().notNull().default(true),
  guest: boolean().notNull().default(false),
  guestName: varchar({ length: 255 }),
});

export const rsvpSchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1),
  phone: z.string().min(1),
  message: z.union([z.string().max(2000), z.null()]),
  attending: z.boolean().default(true),
  guest: z.boolean().default(false),
  guestName: z.union([z.string().max(255), z.null()]),
});

export type Rsvp = typeof rsvpTable.$inferSelect;
