import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const rsvpTable = pgTable('rsvp', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  phone: varchar({ length: 255 }).notNull(),
  meal: varchar({ length: 255 }).notNull(),
});
