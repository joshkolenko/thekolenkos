import ReactCountdown from 'react-countdown';

function DateSegment({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl md:text-4xl leading-4 md:leading-6">{value}</span>
      <span className="text-sm md:text-lg">{label}</span>
    </div>
  );
}

export default function Countdown({ date }: { date: Date }) {
  return (
    <div className="bg-black text-white px-5 py-1.5 md:px-8 md:py-2.5">
      <ReactCountdown
        date={date}
        renderer={({ days, hours, minutes, seconds }) => (
          <p className="font-body flex gap-6 md:gap-8 relative top-0.5">
            <DateSegment value={days} label="days" />
            <DateSegment value={hours} label="hours" />
            <DateSegment value={minutes} label="minutes" />
            <DateSegment value={seconds} label="seconds" />
          </p>
        )}
      />
    </div>
  );
}
