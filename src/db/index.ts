import { drizzle } from 'drizzle-orm/postgres-js';
import { rsvpTable } from './schema';
import { config } from 'dotenv';
import postgres from 'postgres';

config();

const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client);

export async function createRsvp(name: string, email: string, phone: string) {
  return await db.insert(rsvpTable).values({
    name,
    email,
    phone,
  });
}

// export async function getRsvps() {
//   return await db.select().from(rsvpTable);
// }
