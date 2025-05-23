import { drizzle } from 'drizzle-orm/neon-http';
import { rsvpTable } from './schema';

export const db = drizzle(process.env.DATABASE_URL!);

export async function createRsvp(name: string, email: string, phone: string, meal: string) {
  return await db.insert(rsvpTable).values({
    name,
    email,
    phone,
    meal,
  });
}

export async function getRsvps() {
  return await db.select().from(rsvpTable);
}
