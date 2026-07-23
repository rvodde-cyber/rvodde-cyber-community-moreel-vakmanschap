import { colors } from "../config";

const base = import.meta.env.BASE_URL || "/";

export const sceneImages = {
  hero: `${base}images/hero-stokje-doorgeven.jpg`,
  tussenbeeld1: `${base}images/tussenbeeld-1-loper-onderweg.jpg`,
  tussenbeeld2: `${base}images/tussenbeeld-2-stokje-overdracht.jpg`,
  finish: `${base}images/finish-teamresultaat.jpg`,
};

export default function SceneImage({ src, alt, aspectRatio = "16 / 9" }) {
  return (
    <div
      style={{
        aspectRatio,
        borderRadius: 8,
        overflow: "hidden",
        background: colors.surface,
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>
  );
}
