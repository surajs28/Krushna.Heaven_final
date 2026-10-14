"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

/** The approved photograph remains legible before JS; Motion adds gentle,
 * interruptible pointer depth only on a fine pointer and when motion is allowed. */
export function BerryHeroImage() {
  const systemReduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const px = useMotionValue(0), py = useMotionValue(0);
  const x = useSpring(px, { stiffness: 100, damping: 10 });
  const y = useSpring(py, { stiffness: 100, damping: 10 });
  const transform = useTransform([x, y], ([a, b]) => `translate3d(${a}px, ${b}px, 0) scale(1.025)`);
  useEffect(() => {
    const sync = () => setPaused(document.documentElement.classList.contains("motion-paused") || document.hidden);
    sync(); window.addEventListener("gelato-motion", sync); document.addEventListener("visibilitychange", sync);
    const hero = document.querySelector<HTMLElement>(".berry-hero");
    const move = (event: PointerEvent) => {
      if (!hero || systemReduced || document.hidden || document.documentElement.classList.contains("motion-paused") || !matchMedia("(hover:hover) and (pointer:fine)").matches || event.pointerType === "touch") return;
      const box = hero.getBoundingClientRect();
      px.set(((event.clientX - box.left) / box.width - .5) * 8);
      py.set(((event.clientY - box.top) / box.height - .5) * 6);
    };
    const reset = () => { px.set(0); py.set(0); };
    hero?.addEventListener("pointermove", move); hero?.addEventListener("pointerleave", reset);
    return () => { window.removeEventListener("gelato-motion", sync); document.removeEventListener("visibilitychange", sync); hero?.removeEventListener("pointermove", move); hero?.removeEventListener("pointerleave", reset); };
  }, [px, py, systemReduced]);
  return <motion.img className="berry-hero-photo" src="assets/hero-berry.png" alt="Illustrative strawberry and pistachio gelato lifted with a polished ice cream scoop" width={2172} height={724} fetchPriority="high" decoding="async" draggable={false} style={{ transform: systemReduced || paused ? "none" : transform }} />;
}
