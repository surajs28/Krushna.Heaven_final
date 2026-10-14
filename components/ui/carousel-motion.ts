/** Fractional slide positions keep drag and settled coverflow on one geometry. */
export function coverflowPose(item: number, active: number, total: number, progress: number, step: number) {
  let offset = item - active + progress;
  offset = ((offset + total / 2) % total + total) % total - total / 2;
  const distance = Math.abs(offset);
  const x = Math.sign(offset) * step * (Math.min(distance, 1) + Math.max(0, distance - 1) * .78);
  const scale = Math.max(.52, 1 - distance * .16);
  const turn = -Math.sign(offset) * (Math.min(distance, 1) * 12 + Math.max(0, distance - 1) * 8);
  const opacity = distance <= 1 ? 1 : distance <= 2 ? 1 - (distance - 1) * .08 : Math.max(0, .92 * (3 - distance));
  return { x, scale, turn, opacity, distance };
}

export function swipeDirection(dx: number, velocity: number, step: number) {
  // A short flick carries momentum; a slow drag must cross a meaningful distance.
  const projected = dx + velocity * 120;
  return Math.abs(dx) >= 12 && Math.abs(projected) > step * .22 ? (projected < 0 ? 1 : -1) : 0;
}
