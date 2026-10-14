import { CinematicVideo } from "./CinematicVideo";
import type { FilmLayout } from "../types";

export const BrewsScene: React.FC<{ readonly layout: FilmLayout }> = ({
  layout,
}) => (
  <CinematicVideo
    asset="brews-clip.mp4"
    layout={layout}
    objectPositionDesktop="center center"
    objectPositionMobile="62% center"
    trimBeforeSeconds={0}
    playbackRate={0.8}
    panFrom={0.16}
    panTo={-0.16}
    zoomFrom={1.02}
    zoomTo={1.045}
  />
);
