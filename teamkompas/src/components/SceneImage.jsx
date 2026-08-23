import { colors } from "../config";
import hero from "../assets/images/hero-stokje-doorgeven.jpg";
import tussenbeeld1 from "../assets/images/tussenbeeld-1-loper-onderweg.jpg";
import tussenbeeld2 from "../assets/images/tussenbeeld-2-stokje-overdracht.jpg";
import finish from "../assets/images/finish-teamresultaat.jpg";

export const sceneImages = {
  hero,
  tussenbeeld1,
  tussenbeeld2,
  finish,
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
