import { createRsvp, deleteRsvp, getAllRsvps } from "@db";

export async function POST({ request }: { request: Request }) {
  const { name, email, phone, message, guest, guestName, attending } = await request.json();

  if (!name || !email || !phone) {
    return new Response("Invalid input", { status: 400 });
  }

  try {
    await createRsvp({
      name,
      email,
      phone,
      message: message || "",
      guest: guest || false,
      guestName: guestName || "",
      attending: attending !== undefined ? attending : true,
    });

    console.log("RSVP created:", { name, email, phone });

    return new Response(
      JSON.stringify({
        success: true,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting RSVP:", error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}

export async function GET() {
  try {
    const responses = await getAllRsvps();

    return new Response(
      JSON.stringify({
        success: true,
        responses,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error getting RSVPs:", error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}

export async function DELETE({ url }: { url: URL }) {
  const id = url.searchParams.get("id");

  if (!id) {
    return new Response("Invalid input", { status: 400 });
  }

  try {
    const numericId = parseInt(id, 10);

    if (isNaN(numericId)) {
      return new Response("Invalid ID format", { status: 400 });
    }

    await deleteRsvp(numericId);

    console.log("RSVP deleted:", numericId);

    return new Response(
      JSON.stringify({
        success: true,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting RSVP:", error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}
