import evidence from './menu-source.json';

export type PriceSize = 'single' | 'double' | 'family' | 'large';
export type MenuItem = {
  id: string; name: string; description: string; price?: number;
  sizes?: Record<PriceSize, number | null>; badge?: string;
  /** Gelato only: the printed menu's "Classics", "Most Loved" or "Premium Picks" band. */
  tier?: string;
  sources: { page: number; name: string }[];
};
export type MenuGroup = { id: string; title: string; note?: string; items: MenuItem[] };
export type MenuChapter = { id: string; title: string; short: string; description: string; image: string; groups: MenuGroup[] };
type SourceItem = { name: string; desc?: string; price?: string; single?: string; double?: string; family?: string; large?: string };
type SourceGroup = { title?: string; category?: string; items: SourceItem[] };
const groups = evidence.groups as unknown as Record<string, SourceGroup[]>;
export const slug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const names: Record<string, string> = {
  'Browine Frappe': 'Brownie Frappe', 'Pisatchio Kulfi Sundae': 'Pistachio Kulfi Sundae',
  'Yohgurt Wild Berry': 'Yoghurt Wild Berry', 'Dry Fruit falooda': 'Dry Fruit Falooda',
  'Caffe latte': 'Caffe Latte', 'Hot chocolate': 'Hot Chocolate', 'The Gourd-Gee Tiramisu': 'The Gourd-Gée Tiramisu',
  // Round 4 (M15): one spelling across the boards; the printed PDF mixes these.
  'Black Current': 'Black Currant', 'Black Current Smoothie': 'Black Currant Smoothie', 'Black Current Waffle': 'Black Currant Waffle',
  'Orange Cheese Cake': 'Orange Cheesecake', 'Strawberry Cheese Cake': 'Strawberry Cheesecake',
  'New York Cheese Cake': 'New York Cheesecake', 'Black Forest Cheese Cake': 'Black Forest Cheesecake',
};
// Recommendation image supplies badges only. Its prices never enter this model.
const badges: Record<string, string> = {
  'Brownie Shake': 'Must try', 'Cookie & Blast Shake': 'Bestseller',
  'Kesar Pista Falooda': 'Must try', 'Dry Fruit Falooda': 'Bestseller', 'Mango Falooda': "Chef’s special",
  'Sitaphal Mastani': 'Bestseller', 'Choco Brownie Sundae': 'Must try',
  'Cookie Madness Sundae': 'Must try', 'Belgian Choco Sundae': 'Bestseller', 'Pistachio Kulfi Sundae': "Chef’s special",
  // Gelato tier sheet (supplied by the café, 15 Oct 2026): its recommendation tags only.
  // Its purchase costs, margins and older prices never enter this model.
  'Chikoo': 'Bestseller', 'Pink Guava': 'Must try', 'Sitafal': 'Bestseller',
  'Vanilla Oreo Twist': "Chef’s special", 'Mint After 9': 'Must try', 'Blue Sky': "Kids’ special",
  'Blueberry Cheesecake': 'Must try', 'Royal Kulfi': "Chef’s special", 'Vanilla Madagascar': 'Bestseller',
  'Yoghurt Wild Berry': "Chef’s special", 'Mango Alphonso': 'Must try', 'Belgian Chocolate': 'Bestseller',
  'Whisky N Cream': "Chef’s special", 'Pistachio': 'Must try',
};
const cleanDescription = (value = '') => value.replace(/^\(|\)$/g, '').replace(/Geltos|Gelto/g, 'Gelato').replace(/Browine/g, 'Brownie').trim();
// Page 11 has fuller descriptions than the historical website extraction.
const descriptions: Record<string,string> = {
  'Classic Tiramisu': 'The ultimate Italian comfort dessert—light, creamy, and deeply flavorful. Ingredients: Espresso-soaked savoiardi (Ladyfingers), whipped mascarpone cream, premium cocoa powder dusting.',
  'Blueberry Panna Cotta': 'A silky-smooth, delicate cream custard perfectly balanced with a vibrant, tangy berry glaze. Ingredients: Vanilla bean infused sweet cream, fresh blueberry coulis compote, fresh mint.',
  'Chocolate Brownie with Ice-cream': 'A crowd-favorite classic served hot with a dramatic table-side sizzle. Ingredients: Fudgy homemade dark walnut chocolate brownie, hot chocolate fudge sauce, served with a scoop of creamy vanilla gelato.',
  'The Gourd-Gée Tiramisu': 'Served in an elegant, clear glass tumbler, this tiramisu features a velvety, cloud-like mascarpone cream base accented by a rich layer of dark chocolate sauce. It is crowned with three crisp, sugar-dusted ladyfinger biscuits standing upright. Espresso sauce is poured over the center, melting into the cream for an indulgent finish.',
};
function item(raw: SourceItem, page: number, group: string): MenuItem {
  const name = names[raw.name] ?? raw.name;
  return { id: slug(`${group}-${name}`), name, description: descriptions[name] ?? cleanDescription(raw.desc),
    price: raw.price ? Number(raw.price.replace(/[^0-9.]/g, '')) : undefined,
    badge: badges[name], sources: [{ page, name: raw.name }] };
}
function regular(raw: SourceGroup, page: number, title = raw.title!): MenuGroup {
  const id = slug(title);
  return { id, title, items: raw.items.map(row => item(row, page, id)) };
}
const flavourGroups: MenuGroup[] = [];
const seen = new Map<string, MenuItem>();
for (const [key, title, page] of [
  ['gelatoChocolate', 'Chocolate classics', 12], ['gelatoFruit', 'Fruit fresh', 13],
  ['gelatoCreamy', 'Creamy delights', 14], ['gelatoPremium', 'Premium indulgence', 15],
] as const) {
  const group: MenuGroup = { id: slug(title), title, items: [] };
  for (const tier of groups[key]) for (const raw of tier.items) {
    // Both chocolate duplicates refer to the same flavour. Keep every source reference.
    const canonical = raw.name === 'Belgium Chocolate' ? 'Belgian Chocolate' : raw.name;
    const existing = seen.get(canonical);
    if (existing) { existing.sources.push({ page, name: raw.name }); continue; }
    const row = item({ ...raw, name: canonical }, page, 'gelato');
    row.sources = [{ page, name: raw.name }];
    row.tier = (tier as SourceGroup).category;
    row.sizes = { single: Number(raw.single), double: Number(raw.double),
      family: raw.family === '100' ? null : Number(raw.family), large: Number(raw.large) };
    seen.set(canonical, row); group.items.push(row);
  }
  flavourGroups.push(group);
}
const scoops = groups.scoopTreats.map(g => regular(g, 9));
scoops[0].title = 'Shakes'; scoops[0].note = 'With softy';
scoops[1].title = 'Falooda'; scoops[1].note = 'One scoop of ice cream with rabadi';
scoops[2].title = 'Smoothies'; scoops[2].note = 'With softy';
const cones = regular({ items: [
  {name:'Waffle Cone',price:'₹15'}, {name:'Waffle Basket',price:'₹20'},
  {name:'Chocolate Waffle Cone',price:'₹25'}, {name:'Special Waffle Cone',price:'₹30'},
] }, 12, 'Cones & baskets');
const drinks = [...groups.brews.map(g=>regular(g,6)), ...groups.mocktails.map(g=>regular(g,7)),
  ...groups.proteinJuiceTea.map(g=>regular(g,8)), regular({ items: evidence.groups.addons },6,'Brew add-ons')];
// Round 4 (M15): no Protein bar hours. The final PDF keeps "Available from 6.30am - 10.30 am" only as
// hidden text; the printed page doesn't show it, so the site waits for the café to confirm the hours.
export const menuChapters: MenuChapter[] = [
  {id:'gelato',title:'Premium Gelatos',short:'Gelatos',description:'Slow-churned gelato in four families of flavour, then shakes, falooda, mastani and sundaes to finish.',image:'assets/krushna/gelato.jpeg',groups:[...flavourGroups,...scoops,cones]},
  {id:'woodfire',title:'Woodfire Pizza',short:'Woodfire Pizza',description:'Explore our sourdough pizzas, calzones and artisanal panuozzo.',image:'assets/krushna/dna/woodfire-pizza-480.webp',groups:groups.savoury.slice(5).map((g,i)=>regular(g,i===0?4:5))},
  {id:'brews',title:'Brews',short:'Brews',description:'From a first espresso to a long conversation. Coffee, tea and something refreshing.',image:'assets/krushna/gallery/responsive/08-signature-coffee-800.webp',groups:drinks},
  {id:'waffles',title:'Waffles & sweet plates',short:'Waffles',description:'Waffles, mini pancakes and artisanal desserts. Leave room for something sweet.',image:'assets/krushna/gallery/responsive/01-brownie-gelato-480.webp',groups:groups.desserts.map((g,i)=>({...regular(g,i===4?11:10),id:i===4?'desserts':i===0?'waffle-selection':slug(g.title!)}))},
  {id:'savoury',title:'Savoury Bites',short:'Savoury Bites',description:'Pasta, croissant sandwiches, burgers and sides to bring the table together.',image:'assets/krushna/dna/savoury-burger-480.webp',groups:groups.savoury.slice(0,5).map((g,i)=>regular(g,i<2?2:3))},
];
export const allMenuItems = menuChapters.flatMap(c=>c.groups.flatMap(g=>g.items));
export function normaliseSearch(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
}
