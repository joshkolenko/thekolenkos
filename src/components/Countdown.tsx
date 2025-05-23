import ReactCountdown from 'react-countdown';

function DateSegment({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl md:text-3xl">{value}</span>
      <span className="md:text-xl">{label}</span>
    </div>
  );
}

export default function Countdown({ date }: { date: Date }) {
  return (
    <ReactCountdown
      date={date}
      renderer={({ days, hours, minutes, seconds }) => (
        <p className="font-body flex gap-8 md:gap-14">
          <DateSegment value={days} label="days" />
          <DateSegment value={hours} label="hours" />
          <DateSegment value={minutes} label="minutes" />
          <DateSegment value={seconds} label="seconds" />
        </p>
      )}
    />
  );
}
