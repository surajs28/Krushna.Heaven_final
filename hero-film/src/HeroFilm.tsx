import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BrewsScene } from "./scenes/BrewsScene";
import { GelatoScene } from "./scenes/GelatoScene";
import { SavouryScene } from "./scenes/SavouryScene";
import { WafflesScene } from "./scenes/WafflesScene";
import { WoodfireScene } from "./scenes/WoodfireScene";
import type { FilmLayout } from "./types";

type HeroFilmProps = {
  readonly layout: FilmLayout;
};

const SceneFade: React.FC<{
  readonly children: React.ReactNode;
  readonly fadeIn: boolean;
  readonly fadeOut: boolean;
}> = ({ children, fadeIn, fadeOut }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const fadeInValue = fadeIn
    ? interpolate(frame, [0, 8], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.bezier(0.33, 1, 0.68, 1),
      })
    : 1;
  const fadeOutValue = fadeOut
    ? interpolate(frame, [durationInFrames - 8, durationInFrames - 1], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.bezier(0.32, 0, 0.67, 0),
      })
    : 1;

  return <AbsoluteFill style={{ opacity: fadeInValue * fadeOutValue }}>{children}</AbsoluteFill>;
};

export const HeroFilm: React.FC<HeroFilmProps> = ({ layout }) => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#19080d" }}>
      <Sequence name="Premium gelato opening" durationInFrames={48} premountFor={fps}>
        <SceneFade fadeIn={false} fadeOut>
          <GelatoScene layout={layout} direction="intro" />
        </SceneFade>
      </Sequence>
      <Sequence name="Woodfire reveal" from={40} durationInFrames={48} premountFor={fps}>
        <SceneFade fadeIn fadeOut>
          <WoodfireScene layout={layout} />
        </SceneFade>
      </Sequence>
      <Sequence name="Espresso extraction" from={80} durationInFrames={48} premountFor={fps}>
        <SceneFade fadeIn fadeOut>
          <BrewsScene layout={layout} />
        </SceneFade>
      </Sequence>
      <Sequence name="Waffle finish" from={120} durationInFrames={48} premountFor={fps}>
        <SceneFade fadeIn fadeOut>
          <WafflesScene layout={layout} />
        </SceneFade>
      </Sequence>
      <Sequence name="Savoury bites" from={160} durationInFrames={50} premountFor={fps}>
        <SceneFade fadeIn fadeOut>
          <SavouryScene layout={layout} />
        </SceneFade>
      </Sequence>
      <Sequence name="Gelato loop bridge" from={202} durationInFrames={8} premountFor={fps}>
        <SceneFade fadeIn fadeOut={false}>
          <GelatoScene layout={layout} direction="outro" />
        </SceneFade>
      </Sequence>
    </AbsoluteFill>
  );
};
