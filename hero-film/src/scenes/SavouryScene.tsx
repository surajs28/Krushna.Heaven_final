import { CinematicVideo } from "./CinematicVideo";
import type { FilmLayout } from "../types";

export const SavouryScene: React.FC<{ readonly layout: FilmLayout }> = ({
  layout,
}) => (
  <CinematicVideo
    asset="savoury-clip.mp4"
    layout={layout}
    objectPositionDesktop="center center"
    objectPositionMobile="center center"
    trimBeforeSeconds={0}
    playbackRate={0.84}
    panFrom={0.14}
    panTo={-0.12}
    zoomFrom={1.02}
    zoomTo={1.045}
  />
);
