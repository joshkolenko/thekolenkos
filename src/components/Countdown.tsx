import ReactCountdown from 'react-countdown';

export default function Countdown({ date }: { date: Date }) {
  return (
    <ReactCountdown
      date={date}
      renderer={({ days, hours, minutes, seconds }) => (
        <p className="text-2xl font-body flex gap-6">
          <span>{days} days</span>
          <span>{hours} hours</span>
          <span>{minutes} minutes</span>
          <span>{seconds} seconds</span>
        </p>
      )}
    />
  );
}
