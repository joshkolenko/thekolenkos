import type { Rsvp } from "@/db/schema";
import { useEffect, useState } from "react";
import ResponsesList from "./ResponseList";
import MessageForm from "./MessageForm";
import { actions } from "astro:actions";
import { useDebounce } from "@uidotdev/usehooks";

export default function Responses({
  rsvps: initialRsvps,
  numInvited: initialNumInvited,
}: {
  rsvps: Rsvp[];
  numInvited: number;
}) {
  const [rsvps, setRsvps] = useState<Rsvp[]>(initialRsvps);
  const [numInvited, setNumInvited] = useState<number | string>(initialNumInvited);
  const debouncedNumInvited = useDebounce(numInvited, 300);

  const totalAttending =
    rsvps.filter(rsvp => rsvp.attending).length +
    rsvps.filter(rsvp => rsvp.guest).length +
    rsvps.reduce((total, rsvp) => total + rsvp.numAdditionalGuests, 0);

  const totalNotAttending = rsvps.filter(rsvp => !rsvp.attending).length;

  useEffect(() => {
    async function updateNumInvited() {
      await actions.setSetting({
        key: "numInvited",
        value: debouncedNumInvited ? Number(debouncedNumInvited) : 0,
      });
    }

    if (debouncedNumInvited !== initialNumInvited) {
      updateNumInvited();
    }
  }, [debouncedNumInvited]);

  if (rsvps.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-8">
        <i className="ph-fill ph-ghost text-6xl opacity-50" />
        <div className="text-lg opacity-70">No responses yet</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="stats bg-base-100 rounded-md mx-auto stats-vertical sm:stats-horizontal w-full sm:w-auto">
        <div className="stat">
          <div className="stat-figure text-primary">
            <i className="ph-fill ph-smiley text-3xl" />
          </div>
          <div className="stat-title">Going</div>
          <div className="stat-value w-[3ch]">{totalAttending}</div>
          <div className="stat-desc">
            {Number(numInvited) !== 0 &&
              `${((totalAttending / Number(numInvited)) * 100).toFixed(2)}%`}
          </div>
        </div>
        <div className="stat">
          <div className="stat-figure text-neutral">
            <i className="ph-fill ph-smiley-sad text-3xl" />
          </div>
          <div className="stat-title">Not going</div>
          <div className="stat-value w-[3ch]">{totalNotAttending}</div>
          <div className="stat-desc">
            {Number(numInvited) !== 0 &&
              `${((totalNotAttending / Number(numInvited)) * 100).toFixed(2)}%`}
          </div>
        </div>
        <div className="stat">
          <div className="stat-figure text-neutral-content">
            <i className="ph-fill ph-envelope text-3xl" />
          </div>
          <div className="stat-title">Invited</div>
          <div className="stat-value w-[3ch]">
            <input
              type="number"
              className="outline-none hide-spin-buttons appearance-none"
              value={numInvited}
              onChange={e => setNumInvited(e.target.value)}
            />
          </div>
        </div>
      </div>
      <ResponsesList rsvps={rsvps} setRsvps={setRsvps} />
      <div>
        <h2 className="text-2xl">Send message to guests</h2>
        <MessageForm rsvps={rsvps} />
      </div>
    </div>
  );
}
