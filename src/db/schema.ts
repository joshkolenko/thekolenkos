import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const rsvpTable = pgTable('rsvp', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  phone: varchar({ length: 255 }).notNull(),
  guests: varchar({ length: 255 }).notNull(),
});

export type Rsvp = Omit<typeof rsvpTable.$inferSelect, 'id'>;
