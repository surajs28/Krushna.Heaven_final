# Old website audit: krushnasheaven.com

Checked 17 October 2026. Compared with the live site at https://surajs28.github.io/Krushna.Heaven_final/. **Update, 17 October 2026:** A1–A5 (hours, Facebook, fuller address, +91 phones, taglines) were approved and are now on the site. Everything else below still waits for approval or the owner's answers.

## In short

- **Menu: nothing missing.** All 184 items on the old menu page are on ours (we also have the 4 cone and basket options). The old "Download menu" PDF is byte-for-byte the same final menu we already offer.
- **Biggest gaps:** opening hours (the old site says **Mon – Sun, 8:00 AM – 1:30 AM**), the **Facebook** page, the fuller street address, and a **"New Branch"** announcement.
- **Content to consider:** brand taglines, the café's origin story, and the gelato "how it's made" lines.
- **Claims to keep off the site** unless the owner confirms them: organic dairy, "guilt-free / less fat", "98%", and the investor and expansion figures.

## 1. What the old site contains

| Page | What's on it |
|---|---|
| Home `/` | Hero "Taste Heaven in Every Scoop" (artisan ice cream and desserts); Download Brochure and View Menu buttons; "Sweet Collections" (Gelato, Shakes "20+ flavours", Coffee); signature desserts (Tiramisu, Blueberry Pannacotta, Brownie with Ice Cream, **White Ice Cream**, **Caramel Custard**); gelato tiers (Popular from ₹100, Premium ₹110, Supreme ₹130, Ultimate ₹140); "The Art of Gelato"; an origin story ("Crafting Pure Delight"); "The Heaven Standard" (Organic / Handmade / Premium); "Come visit us" |
| Menu `/menu` | The full menu: the same data as ours |
| Contact `/contact` | A contact form (subjects: General Inquiry, **Catering Request**, Feedback, **Careers**); both phones; email; full address; **hours Mon – Sun 8:00 AM – 1:30 AM** |
| About `/about` | Empty (navigation and footer only) |
| New Branch `/new-branch` | Empty page, but linked from a **pulsing "New Branch" button** in the navigation |
| Footer | "© 2024 Krushna's Heaven. Indulgent, airy, and visually delightful." · Instagram · **Facebook** · Hours · Contact |
| Files | `Broacher-….pdf`: a 10-page brochure, 14.8 MB (see section 4); `Menu_0111-….pdf`: the same final menu we use |

Technical notes:
- **The contact form sends nothing.** The old site's code has no submission service, so messages typed into it probably went nowhere.
- **It isn't search-friendly.** The page title is "krushnas cafe", with no description and no sharing tags.
- **It's still on the café's own domain** (Hostinger), last updated 8 October 2026.

## 2. Missing from our site, ready once you approve

These come from the café's own old site, so they're low risk. Each still needs a quick "yes, still true" from the owner.

| # | Item | Old site says | Where it would go on ours |
|---|---|---|---|
| ✅ A1 | **Opening hours** | Mon – Sun, 8:00 AM – 1:30 AM (also on Instagram) | Visit page, homepage visit card, footer, search data (JSON-LD `openingHours`). Replaces "Coming soon" |
| ✅ A2 | **Facebook page** | https://www.facebook.com/share/1NuEDB7wnS/ | Footer "Follow", Visit page "Say hello", search data `sameAs` |
| ✅ A3 | **Fuller address** | Vitthal Rao Shivarkar Rd, next to Krushnas Pure Veg, **Tatya Tope Housing Society**, Wanwadi, Pune 411040 | Visit page address, footer, search data `streetAddress` (keeps the printed menu's landmarks too) |
| ✅ A4 | **Phones with country code** | +91 91566 00883 / +91 91566 00884 | Display only: we show them without +91 today; the links already dial correctly |
| ✅ A5 | **Brand lines** | "Indulge in Happiness, Scoop by Scoop." · "Happiness is a scoop away." · "Taste Heaven in Every Scoop" · "Handcrafted Happiness Daily" | One or two as accents, e.g. in the gelato chapter of Our Story, the menu's gelato story, or the homepage |
| A6 | **"What guests mention"** | The brochure's summary of guest feedback: wide variety of rich, creamy, fresh gelato and sorbet; vegetarian food (sandwiches, pizzas, waffles); refreshing, welcoming ambience; a great spot for photos; friendly, polite staff and quick service | An intro line for the reviews section, **only once the real Google reviews are in** to back it up |
| A7 | **Catering and careers** | Contact form subjects "Catering Request" and "Careers" | If the café still offers them: a "Catering & events" line beside the banquet hall, and a "Join our team" email link on the Visit page |

## 3. Needs the owner's answer first

| # | Question | Why it matters |
|---|---|---|
| B1 | **Is a new branch opening?** The old site had a pulsing "New Branch" button; the brochure's roadmap shows New Outlet 1, New Outlet 2 and a Central Factory | If yes, a "New branch: coming soon" teaser (homepage and Visit) with the area and date when known |
| B2 | **Origin story:** "Krushna's Heaven started as a small dream in a cozy kitchen, fuelled by a passion for the perfect scoop…" | Would become a "Where it began" chapter on Our Story, which currently claims no origin story |
| B3 | **Established year:** the brochure says **2026**, the old footer **© 2024**, and an earlier menu cover showed **2023** | We show no year today. Pick one before we use any |
| B4 | **Gelato making claims** from the brochure: "prepared in-house in small micro-batches", "served slightly warmer than ice cream", "more milk than cream" | Good for the gelato story. They're the café's own claims but still preparation claims, so they need an OK |
| B5 | **White Ice Cream and Caramel Custard** were signature desserts on the old homepage but aren't on the final menu | Add only if they're still served (we have an old caramel custard photo in `legacy/`) |
| B6 | **A working contact form?** | Ours uses call, email and Instagram. A real form needs a free form service tied to the café's email, which the owner sets up; otherwise it would fail like the old one |
| B7 | **Brochure download?** | The brochure mixes product pages with an investor pitch (expansion plan, margins, "proof of concept"). I'd suggest **not** linking it for customers, or making a customer-only version |
| B8 | **Domain switch:** krushnasheaven.com still shows the old site | Point the domain at the new site (Phase 5 of the plan) |

## 4. Don't use without written approval

| Old content | Why not |
|---|---|
| "Fresh organic milk", "finest organic dairy", the "Organic" badge | `INTENT.md` rule: no organic or health claims without proof |
| "Guilt-free indulgence", "less fat", "98%" (an unexplained figure in the brochure) | Health and nutrition claims |
| "No shortcuts, no pre-mixes", "hand-selected single-origin Arabica", "high-hydration Neapolitan dough with leopard char" | Preparation claims we can't verify. "Wood-fired" also conflicts with the menu's "sourdough" |
| Investor lines ("highly successful parlour", "strong footfalls", margins, central factory) | Business pitch, not customer content |
| Brochure photos | Mostly stock. One burger photo appears to show a **meat** patty, wrong for a 100% vegetarian café (worth fixing in the brochure itself) |
| Old hero image (stacked scoops with a "Krushna's Heaven" sign) | Looks AI-generated. It's attractive and shows real flavours (chocolate, Pink Guava, Blue Sky); usable only if the owner is happy to use it as an illustration |

## 5. Already covered on our site

- The full menu with prices, the downloadable final-menu PDF, and both phones and the email.
- The official Google Maps link (the same one the old site uses) and Instagram.
- Signature desserts (tiramisu, panna cotta, brownie), the gelato tiers and sizes, and the slow-churned / less-air gelato explanation.
- The old site's photos of the brownie, panna cotta, shake, pizza, gelato and tiramisu: the first three are live as WebP versions; the rest are archived in `legacy/`.

## 6. Small things spotted

- **The brochure's website address is misspelt:** "www.krushnaheaven.com" (the real domain is krushna**s**heaven.com).
- **The old site's spellings** include "Broacher" (file name), "Black Current", "Yohgurt Wild Berry" and "Belgium Chocolate". Ours already corrects them.

## Proposed next steps (pick any)

1. **Add A1–A4** (hours, Facebook, fuller address, +91 phones) across the Visit page, homepage card, footer and search data. About 20 minutes.
2. **Add A5:** one or two of the café's own taglines.
3. **Send B1–B8 to the owner** as a short checklist. I can draft a WhatsApp-ready message.
4. **Later, once answered:** a new-branch teaser, a "Where it began" chapter, the gelato-making lines, and a catering/careers line.
