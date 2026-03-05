import type { Rsvp } from "@/db/schema";
import { useEffect, useState } from "react";
import { actions } from "astro:actions";
import clsx from "clsx";
import EditableInput from "./EditableInput";

export default function ResponsesTable({ rsvps: initialRsvps }: { rsvps: Rsvp[] }) {
  const [rsvps, setRsvps] = useState<Rsvp[]>(initialRsvps);
  const [activeRsvp, setActiveRsvp] = useState<Rsvp | null>(null);
  const [isHoldingDelete, setIsHoldingDelete] = useState(false);
  const [deleteProgress, setDeleteProgress] = useState(0);

  const totalAttending =
    rsvps.filter(rsvp => rsvp.attending).length +
    rsvps.filter(rsvp => rsvp.guest).length +
    rsvps.reduce((total, rsvp) => total + rsvp.numAdditionalGuests, 0);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isHoldingDelete) {
      interval = setInterval(() => {
        setDeleteProgress(prev => {
          if (prev >= 100) {
            if (activeRsvp) {
              handleDelete(activeRsvp.id);
              closeDialog();
            }

            setIsHoldingDelete(false);
            return 0;
          }

          return prev + 1;
        });
      }, 25);
    } else {
      setDeleteProgress(0);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isHoldingDelete]);

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

  function openDialog(rsvp: Rsvp) {
    const dialog = document.getElementById("responses-dialog") as HTMLDialogElement;

    if (dialog) {
      setActiveRsvp(rsvp);
      dialog.showModal();
    }
  }

  function closeDialog() {
    const dialog = document.getElementById("responses-dialog") as HTMLDialogElement;

    if (dialog) {
      setActiveRsvp(null);
      dialog.close();
    }
  }

  function updateRsvp(id: number, data: Partial<Omit<Rsvp, "id">>) {
    actions.updateRsvp({ id, data });
    const updatedRsvps = rsvps.map(rsvp => (rsvp.id === id ? { ...rsvp, ...data } : rsvp));

    setRsvps(updatedRsvps.sort((a, b) => b.created.getTime() - a.created.getTime()));
    setActiveRsvp(updatedRsvps.find(rsvp => rsvp.id === id) || null);
  }

  return (
    <div>
      <p className="text-3xl text-center wght-600 mb-12">{totalAttending} guests attending</p>
      <ul className="list bg-base-100 rounded-lg">
        {rsvps
          .sort((a, b) => b.created.getTime() - a.created.getTime())
          .map((rsvp, i) => {
            const formattedPhone = rsvp.phone.replace(
              /^(\+?1)?(\d{3})(\d{3})(\d{4})/,
              (_, __, a, b, c) => `(${a}) ${b}-${c}`
            );

            return (
              <li
                className="list-row hover:bg-base-300/10 cursor-pointer"
                key={i}
                onClick={() => openDialog(rsvp)}
              >
                <div className="avatar avatar-placeholder">
                  <div
                    className={clsx(
                      "w-10 h-10 rounded-full",
                      i % 2 === 0
                        ? "bg-secondary text-secondary-content"
                        : "bg-primary text-primary-content"
                    )}
                  >
                    <span className="">
                      {rsvp.name
                        .split(" ")
                        .slice(0, 2)
                        .map(part => part[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="wght-600">
                  <div>
                    {rsvp.name} {rsvp.guest && `& ${rsvp.guestName}`}
                    {rsvp.numAdditionalGuests > 0 && (
                      <span className="text-xs opacity-50"> +{rsvp.numAdditionalGuests}</span>
                    )}
                  </div>
                  <div
                    className={clsx(
                      "text-xs opacity-60",
                      rsvp.attending ? "text-success" : "text-error"
                    )}
                  >
                    {rsvp.attending ? "Going" : "Not going"}
                  </div>
                </div>
                <a
                  href={`tel:${formattedPhone}`}
                  className="hidden md:flex items-center gap-2 btn btn-ghost"
                  onClick={e => e.stopPropagation()}
                >
                  <i className="ph-fill ph-phone" /> {formattedPhone}
                </a>
                <a
                  href={`mailto:${rsvp.email}`}
                  className="hidden lg:flex items-center gap-2 btn btn-ghost"
                  onClick={e => e.stopPropagation()}
                >
                  <i className="ph-fill ph-envelope" /> {rsvp.email.toLowerCase()}
                </a>
              </li>
            );
          })}
      </ul>
      <dialog id="responses-dialog" className="modal">
        <div className="modal-box rounded-md">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-square btn-ghost absolute right-2 top-2">✕</button>
          </form>
          {activeRsvp && (
            <>
              <h3 className="wght-700 text-xl pr-10">
                {activeRsvp.name} {activeRsvp.guest && `& ${activeRsvp.guestName}`}
                {activeRsvp.numAdditionalGuests > 0 && (
                  <span className="opacity-50"> +{activeRsvp.numAdditionalGuests}</span>
                )}
              </h3>
              {activeRsvp.message && (
                <blockquote className="my-4 p-4 bg-base-300/30 rounded">
                  "{activeRsvp.message}"
                </blockquote>
              )}
              <h4 className="text-lg mt-6 mb-2">Information</h4>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="label">Email</label>
                  <EditableInput
                    value={activeRsvp.email}
                    onChange={value => {
                      updateRsvp(activeRsvp.id, { email: String(value) });
                    }}
                    type="email"
                  />
                </div>
                <div>
                  <label className="label">Phone</label>
                  <EditableInput
                    value={activeRsvp.phone}
                    onChange={value => {
                      updateRsvp(activeRsvp.id, { phone: String(value) });
                    }}
                    type="phone"
                  />
                </div>
                <div>
                  <label className="label">Additional guests</label>
                  <EditableInput
                    value={activeRsvp.numAdditionalGuests}
                    onChange={value => {
                      updateRsvp(activeRsvp.id, { numAdditionalGuests: value ? Number(value) : 0 });
                    }}
                    type="number"
                  />
                </div>
                <button
                  className="btn btn-error mr-auto relative overflow-hidden"
                  onPointerDown={() => setIsHoldingDelete(true)}
                  onPointerUp={() => setIsHoldingDelete(false)}
                  onPointerLeave={() => setIsHoldingDelete(false)}
                >
                  {deleteProgress > 0 && (
                    <div
                      className="absolute inset-0 bg-error transition-all duration-75"
                      style={{ width: `${deleteProgress}%` }}
                    />
                  )}
                  <span className="relative z-10">
                    {isHoldingDelete ? "Hold to delete..." : "Delete"}
                  </span>
                </button>
              </div>
            </>
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
