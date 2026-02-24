import type { Rsvp } from "@/db/schema";
import { useState } from "react";
import { actions } from "astro:actions";

export default function ResponsesTable({ rsvps: initialRsvps }: { rsvps: Rsvp[] }) {
  const [rsvps, setRsvps] = useState<Rsvp[]>(initialRsvps);
  const adjustment = 2;
  const totalAttending =
    rsvps.filter(rsvp => rsvp.attending).length +
    rsvps.filter(rsvp => rsvp.guest).length +
    adjustment;

  async function handleDelete(id: number) {
    const { error } = await actions.deleteRsvp({ id });

    if (error) {
      console.error("Error deleting rsvp");

      return;
    }

    setRsvps(prevRsvps => prevRsvps?.filter(rsvp => rsvp.id !== id) || null);
  }

  if (!rsvps) {
    return <div className="loading loading-sm loading-spinner" />;
  }

  const columns = ["Name", "Email", "Phone", "Message", "Attending", "Guest"];

  return (
    <div>
      <p className="text-3xl text-center wght-600 mb-8">{totalAttending} guests attending</p>
      <div className="overflow-x-auto -mx-8 md:px-4 pb-8">
        <table className="table">
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col}>{col}</th>
              ))}
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rsvps.map(rsvp => (
              <tr key={rsvp.id}>
                <td className="whitespace-nowrap">{rsvp.name}</td>
                <td>{rsvp.email}</td>
                <td>{rsvp.phone}</td>
                <td className="min-w-[20ch]">{rsvp.message}</td>
                <td>{rsvp.attending ? "Yes" : "No"}</td>
                <td className="whitespace-nowrap">{rsvp.guestName}</td>
                <td className="flex items-center justify-center">
                  <button className="btn btn-error btn-xs" onClick={() => handleDelete(rsvp.id!)}>
                    <i className="ph-bold ph-trash text-[0.8rem]" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
