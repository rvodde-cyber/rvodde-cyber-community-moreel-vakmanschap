export default function ImagePlaceholder({ label, description, aspectRatio = "16 / 9" }) {
  return (
    <div
      style={{
        aspectRatio,
        background:
          "repeating-linear-gradient(45deg, #F5F1EC, #F5F1EC 10px, #EDE6DB 10px, #EDE6DB 20px)",
        border: "2px dashed #C9791C",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "16px",
      }}
    >
      <div>
        <div style={{ fontWeight: 600, color: "#8A4B0F" }}>{label}</div>
        {description && (
          <div style={{ fontSize: "0.85em", opacity: 0.7, marginTop: 4 }}>{description}</div>
        )}
      </div>
    </div>
  );
}
