// Warm café lights for the night sections: our version of the reference starfield.
// One sticky canvas per section, drawn only while that section is on screen.

type Light = {
  x: number;
  y: number;
  depth: number;
  radius: number;
  alpha: number;
  phase: number;
  speed: number;
  drift: number;
  color: string;
};

// Ivory bulbs dominate; a few raspberry and amber sparks echo the brand.
const palette = ["255, 236, 214", "255, 236, 214", "255, 236, 214", "246, 160, 190", "236, 182, 122"];

export const mountAmbientLights = (host: HTMLElement, reducedMotion: MediaQueryList) => {
  const layer = document.createElement("div");
  layer.className = "ambient-lights";
  layer.setAttribute("aria-hidden", "true");
  const canvas = document.createElement("canvas");
  layer.append(canvas);
  host.prepend(layer);
  const context = canvas.getContext("2d");
  if (!context) return;

  let lights: Light[] = [];
  let width = 0;
  let height = 0;
  let frame = 0;
  let visible = false;
  const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

  const createLight = (): Light => ({
    x: Math.random() * width,
    y: Math.random() * height,
    depth: 0.2 + Math.random() * 0.8,
    radius: 0.45 + Math.random() * 1.35,
    alpha: 0.22 + Math.random() * 0.55,
    phase: Math.random() * Math.PI * 2,
    speed: 0.35 + Math.random() * 1.1,
    drift: 3 + Math.random() * 9,
    color: palette[Math.floor(Math.random() * palette.length)],
  });

  const resize = () => {
    // Soft points of light need no more than 1.5× pixels; this halves the work on retina screens.
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    const nextWidth = canvas.clientWidth;
    const nextHeight = canvas.clientHeight;
    if (!nextWidth || !nextHeight) return;
    const sameSize = nextWidth === width && nextHeight === height;
    width = nextWidth;
    height = nextHeight;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    if (!sameSize || !lights.length) {
      const count = Math.min(90, Math.round((width * height) / 15000));
      lights = Array.from({ length: count }, createLight);
    }
  };

  const draw = (time: number) => {
    const seconds = time / 1000;
    context.clearRect(0, 0, width, height);
    pointer.x += (pointer.targetX - pointer.x) * 0.05;
    pointer.y += (pointer.targetY - pointer.y) * 0.05;
    const wrap = height + 24;
    for (const light of lights) {
      const twinkle = 0.55 + 0.45 * Math.sin(seconds * light.speed + light.phase);
      let y = (light.y - seconds * light.drift * light.depth) % wrap;
      if (y < -12) y += wrap;
      const x = light.x + pointer.x * light.depth * 14;
      const drawY = y + pointer.y * light.depth * 10;
      const alpha = light.alpha * twinkle;
      if (light.radius > 1.25) {
        context.fillStyle = `rgba(${light.color}, ${alpha * 0.16})`;
        context.beginPath();
        context.arc(x, drawY, light.radius * 4.2, 0, Math.PI * 2);
        context.fill();
      }
      context.fillStyle = `rgba(${light.color}, ${alpha})`;
      context.beginPath();
      context.arc(x, drawY, light.radius, 0, Math.PI * 2);
      context.fill();
    }
  };

  const loop = (time: number) => {
    draw(time);
    frame = window.requestAnimationFrame(loop);
  };

  const sync = () => {
    window.cancelAnimationFrame(frame);
    frame = 0;
    if (!visible || document.hidden) return;
    if (reducedMotion.matches) {
      draw(0);
      return;
    }
    frame = window.requestAnimationFrame(loop);
  };

  resize();
  new ResizeObserver(() => {
    resize();
    if (!frame && visible) draw(0);
  }).observe(canvas);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  }).observe(host);
  document.addEventListener("visibilitychange", sync);
  reducedMotion.addEventListener?.("change", sync);
  window.addEventListener("pointermove", (event) => {
    if (!finePointer.matches) return;
    pointer.targetX = event.clientX / window.innerWidth - 0.5;
    pointer.targetY = event.clientY / window.innerHeight - 0.5;
  }, { passive: true });
};
