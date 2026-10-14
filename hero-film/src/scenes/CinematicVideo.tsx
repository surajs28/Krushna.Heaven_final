import { Video } from "@remotion/media";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { FilmLayout } from "../types";

type CinematicVideoProps = {
  readonly asset: string;
  readonly layout: FilmLayout;
  readonly objectPositionDesktop: string;
  readonly objectPositionMobile: string;
  readonly trimBeforeSeconds: number;
  readonly playbackRate?: number;
  readonly panFrom?: number;
  readonly panTo?: number;
  readonly zoomFrom?: number;
  readonly zoomTo?: number;
};

export const CinematicVideo: React.FC<CinematicVideoProps> = ({
  asset,
  layout,
  objectPositionDesktop,
  objectPositionMobile,
  trimBeforeSeconds,
  playbackRate = 0.86,
  panFrom = 0,
  panTo = 0,
  zoomFrom = 1.02,
  zoomTo = 1.045,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#19080d", overflow: "hidden" }}>
      <Video
        src={staticFile(`hero-film/video/${asset}`)}
        trimBefore={trimBeforeSeconds * fps}
        playbackRate={playbackRate}
        muted
        premountFor={fps}
        objectFit="cover"
        style={{
          width: "100%",
          height: "100%",
          objectPosition:
            layout === "mobile" ? objectPositionMobile : objectPositionDesktop,
          scale: interpolate(frame, [0, durationInFrames - 1], [zoomFrom, zoomTo], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.77, 0, 0.175, 1),
          }),
          translate: `${interpolate(
            frame,
            [0, durationInFrames - 1],
            [panFrom, panTo],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.77, 0, 0.175, 1),
            },
          )}% 0%`,
          // Keep the export clean: the website owns the wine contrast mask.
          // Baking that mask here made it stack with the live hero overlay.
          filter: "saturate(1.1) contrast(1.04)",
        }}
      />

    </AbsoluteFill>
  );
};
