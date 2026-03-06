import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { rsvpTable, settingsTable, type Rsvp } from "./schema";

import "dotenv/config";

export const db = drizzle(process.env.DATABASE_URL!);

export const rsvp = {
  async create(rsvp: Omit<Rsvp, "id" | "created">) {
    return await db.insert(rsvpTable).values(rsvp);
  },
  async getAll() {
    return await db.select().from(rsvpTable);
  },
  async delete(id: number) {
    return await db.delete(rsvpTable).where(eq(rsvpTable.id, id));
  },
  async update(id: number, data: Partial<Omit<Rsvp, "id" | "created">>) {
    return await db.update(rsvpTable).set(data).where(eq(rsvpTable.id, id));
  },
};

export const settings = {
  async set(key: string, value: string | number | boolean | null) {
    const existing = await db.select().from(settingsTable).where(eq(settingsTable.key, key));

    if (existing.length > 0) {
      return await db.update(settingsTable).set({ value }).where(eq(settingsTable.key, key));
    } else {
      return await db.insert(settingsTable).values({ key, value });
    }
  },
  async get(key: string) {
    const setting = await db.select().from(settingsTable).where(eq(settingsTable.key, key));
    return setting.length > 0 ? setting[0].value : null;
  },
  async getAll() {
    return await db.select().from(settingsTable);
  },
};
