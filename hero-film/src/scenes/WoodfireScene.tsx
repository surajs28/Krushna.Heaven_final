import { CinematicVideo } from "./CinematicVideo";
import type { FilmLayout } from "../types";

export const WoodfireScene: React.FC<{ readonly layout: FilmLayout }> = ({
  layout,
}) => (
  <CinematicVideo
    asset="pizza-clip.mp4"
    layout={layout}
    objectPositionDesktop="center center"
    objectPositionMobile="58% center"
    trimBeforeSeconds={0}
    playbackRate={0.82}
    panFrom={-0.18}
    panTo={0.2}
    zoomFrom={1.025}
    zoomTo={1.05}
  />
);
