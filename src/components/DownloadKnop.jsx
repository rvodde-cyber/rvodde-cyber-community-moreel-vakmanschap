function downloadUrlFromMap(map, bestand) {
  return `/downloads/${map}/${bestand}`;
}

export default function DownloadKnop({
  bestand,
  map,
  href,
  label,
  accentColor,
  variant = "filled",
  disabled,
  disabledTitle,
}) {
  const baseStyle = {
    padding: "0.45rem 0.9rem",
    fontFamily: "DM Sans, sans-serif",
    fontSize: "0.8rem",
    borderRadius: "6px",
    fontWeight: 500,
    textAlign: "center",
  };

  if (disabled || !bestand) {
    return (
      <span
        title={disabledTitle}
        aria-disabled="true"
        style={{
          ...baseStyle,
          backgroundColor: "#eeedea",
          color: "#888780",
          border: "1px solid #d3d1c7",
          cursor: "not-allowed",
        }}
      >
        {label}
      </span>
    );
  }

  const filled = variant === "filled";
  const url = href ?? downloadUrlFromMap(map, bestand);

  return (
    <a
      href={url}
      download={bestand}
      style={{
        ...baseStyle,
        textDecoration: "none",
        backgroundColor: filled ? accentColor : "transparent",
        color: filled ? "#ffffff" : accentColor,
        border: filled ? "none" : `1px solid ${accentColor}`,
      }}
    >
      {label}
    </a>
  );
}
