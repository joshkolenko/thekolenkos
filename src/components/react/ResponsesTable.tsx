import type { Rsvp } from "@/db/schema";
import { useEffect, useState } from "react";

export default function ResponsesTable() {
  const [rsvps, setRsvps] = useState<Rsvp[] | null>(null);

  async function handleDelete(id: number) {
    try {
      const response = await fetch(`/api/rsvp?id=${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        setRsvps(prevRsvps => prevRsvps?.filter(rsvp => rsvp.id !== id) || null);
      } else {
        console.error("Failed to delete RSVP:", data);
      }
    } catch (error) {
      console.error("Error deleting RSVP:", error);
    }
  }

  useEffect(() => {
    async function fetchRsvps() {
      try {
        const response = await fetch("/api/rsvp");
        const data = await response.json();
        if (data.success) {
          setRsvps(data.responses);
        } else {
          setRsvps([]);
          console.error("Failed to fetch RSVPs:", data);
        }
      } catch (error) {
        console.error("Error fetching RSVPs:", error);
      }
    }

    fetchRsvps();
  }, []);

  if (!rsvps) {
    return <div className="loading loading-sm loading-spinner" />;
  }

  const columns = ["Name", "Email", "Phone", "Message", "Attending", "Guest"];

  return (
    <div className="overflow-x-auto -mx-8 px-4 pb-8">
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
  );
}
