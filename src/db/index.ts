import { drizzle } from 'drizzle-orm/postgres-js';
import { rsvpTable, type Rsvp } from './schema';
import { config } from 'dotenv';
import postgres from 'postgres';

config();

const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client);

export async function createRsvp(rsvp: Rsvp) {
  return await db.insert(rsvpTable).values(rsvp);
}

// export async function getRsvps() {
//   return await db.select().from(rsvpTable);
// }
