import { CinematicVideo } from "./CinematicVideo";
import type { FilmLayout } from "../types";

type GelatoSceneProps = {
  readonly layout: FilmLayout;
  readonly direction?: "intro" | "main" | "outro";
};

export const GelatoScene: React.FC<GelatoSceneProps> = ({
  layout,
  direction = "main",
}) => {
  const motion = {
    intro: { panFrom: 0, panTo: -0.15, zoomFrom: 1.02, zoomTo: 1.04 },
    main: { panFrom: 0.28, panTo: -0.28, zoomFrom: 1.02, zoomTo: 1.05 },
    outro: { panFrom: 0.08, panTo: 0, zoomFrom: 1.015, zoomTo: 1.02 },
  }[direction];

  return (
    <CinematicVideo
      asset="gelato-clip.mp4"
      layout={layout}
      objectPositionDesktop="center center"
      objectPositionMobile="64% center"
      trimBeforeSeconds={0}
      playbackRate={0.78}
      {...motion}
    />
  );
};
