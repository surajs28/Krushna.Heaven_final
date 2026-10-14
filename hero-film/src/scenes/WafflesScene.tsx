import { CinematicVideo } from "./CinematicVideo";
import type { FilmLayout } from "../types";

export const WafflesScene: React.FC<{ readonly layout: FilmLayout }> = ({
  layout,
}) => (
  <CinematicVideo
    asset="waffles-clip.mp4"
    layout={layout}
    objectPositionDesktop="center center"
    objectPositionMobile="55% center"
    trimBeforeSeconds={0}
    playbackRate={0.82}
    panFrom={-0.14}
    panTo={0.16}
    zoomFrom={1.02}
    zoomTo={1.05}
  />
);
