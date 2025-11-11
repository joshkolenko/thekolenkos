import { boolean, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const rsvpTable = pgTable('rsvp', {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  phone: varchar({ length: 255 }).notNull(),
  message: varchar({ length: 255 }),
  attending: boolean().notNull().default(true),
  guest: boolean().notNull().default(false),
  guestName: varchar({ length: 255 }),
});

export type Rsvp = Omit<typeof rsvpTable.$inferSelect, 'id'>;
