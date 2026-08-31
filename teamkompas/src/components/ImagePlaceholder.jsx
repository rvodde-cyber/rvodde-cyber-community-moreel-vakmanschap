export default function ImagePlaceholder({ label, description, aspectRatio = "16 / 9" }) {
  return (
    <div
      className="glass-subtle flex items-center justify-center p-4 text-center"
      style={{ aspectRatio }}
    >
      <div>
        <div className="text-base font-semibold text-ink">{label}</div>
        {description ? <div className="mt-1 text-sm text-ink-muted">{description}</div> : null}
      </div>
    </div>
  );
}
