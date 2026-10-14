import { Composition, Folder } from "remotion";
import { BrewsScene } from "./scenes/BrewsScene";
import { GelatoScene } from "./scenes/GelatoScene";
import { SavouryScene } from "./scenes/SavouryScene";
import { WafflesScene } from "./scenes/WafflesScene";
import { WoodfireScene } from "./scenes/WoodfireScene";
import { HeroFilm } from "./HeroFilm";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="KrushnaHeroFilm-Desktop"
        component={HeroFilm}
        durationInFrames={210}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ layout: "desktop" }}
      />
      <Composition
        id="KrushnaHeroFilm-Mobile"
        component={HeroFilm}
        durationInFrames={210}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ layout: "mobile" }}
      />
      <Folder name="Scenes">
        <Composition
          id="GelatoScene"
          component={GelatoScene}
          durationInFrames={48}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{ layout: "desktop", direction: "main" }}
        />
        <Composition
          id="WoodfireScene"
          component={WoodfireScene}
          durationInFrames={48}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{ layout: "desktop" }}
        />
        <Composition
          id="BrewsScene"
          component={BrewsScene}
          durationInFrames={48}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{ layout: "desktop" }}
        />
        <Composition
          id="WafflesScene"
          component={WafflesScene}
          durationInFrames={48}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{ layout: "desktop" }}
        />
        <Composition
          id="SavouryScene"
          component={SavouryScene}
          durationInFrames={48}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{ layout: "desktop" }}
        />
      </Folder>
    </>
  );
};
