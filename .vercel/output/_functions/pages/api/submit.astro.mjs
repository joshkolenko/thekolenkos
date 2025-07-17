import { drizzle } from 'drizzle-orm/postgres-js';
import { pgTable, varchar, integer } from 'drizzle-orm/pg-core';
import { config } from 'dotenv';
import postgres from 'postgres';
export { renderers } from '../../renderers.mjs';

const rsvpTable = pgTable("rsvp", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  phone: varchar({ length: 255 }).notNull(),
  guests: varchar({ length: 255 }).notNull()
});

config();
const client = postgres(process.env.DATABASE_URL);
const db = drizzle(client);
async function createRsvp(name, email, phone) {
  return await db.insert(rsvpTable).values({
    name,
    email,
    phone
  });
}

async function POST({ request }) {
  const { name, email, phone } = await request.json();
  if (!name || !email || !phone) {
    return new Response("Invalid input", { status: 400 });
  }
  try {
    const result = await createRsvp(name, email, phone);
    console.log("RSVP created:", result);
    console.log("RSVP submitted:", { name, email, phone });
    return new Response("RSVP submitted successfully", { status: 200 });
  } catch (error) {
    console.error("Error submitting RSVP:", error);
    return new Response("Error submitting RSVP", { status: 500 });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
