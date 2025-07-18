import { drizzle } from 'drizzle-orm/neon-http';
import { rsvpTable, type Rsvp } from './schema';

import 'dotenv/config';

export const db = drizzle(process.env.DATABASE_URL!);

export async function createRsvp(rsvp: Rsvp) {
  return await db.insert(rsvpTable).values(rsvp);
}
