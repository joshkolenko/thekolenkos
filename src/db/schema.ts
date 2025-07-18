import { boolean, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const rsvpTable = pgTable('rsvp', {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  phone: varchar({ length: 255 }).notNull(),
  guests: varchar({ length: 255 }),
  attending: boolean().notNull().default(true),
});

export type Rsvp = Omit<typeof rsvpTable.$inferSelect, 'id'>;
