import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { rsvpTable, type Rsvp } from "./schema";

import "dotenv/config";

export const db = drizzle(process.env.DATABASE_URL!);

export async function createRsvp(rsvp: Omit<Rsvp, "id">) {
  return await db.insert(rsvpTable).values(rsvp);
}

export async function getAllRsvps() {
  return await db.select().from(rsvpTable);
}

export async function deleteRsvp(id: number) {
  return await db.delete(rsvpTable).where(eq(rsvpTable.id, id));
}
