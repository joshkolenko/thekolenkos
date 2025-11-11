export default function FormError({ error, showError }: { error: string; showError?: boolean }) {
  if (!showError || !error) {
    return null;
  }

  return <div className="text-red-500 text-sm mt-1 tracking-tight">{error}</div>;
}
