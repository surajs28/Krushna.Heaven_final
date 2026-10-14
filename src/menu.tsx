import { BerryHeroImage } from "@/components/ui/berry-hero-image";
import { createRoot } from "react-dom/client";
import { CoverFlowCarousel } from "@/components/ui/3-d-coverflow-carousel";
const container = document.getElementById("flavours");
const heroImage = document.getElementById("berry-hero-image");
if (heroImage) createRoot(heroImage).render(<BerryHeroImage />);
if (container && document.body.dataset.page === "index.html") createRoot(container).render(<CoverFlowCarousel />);
