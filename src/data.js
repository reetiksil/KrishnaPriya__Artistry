// src/data.js

/* ------------------------------------------------------------------
   NEWS — single reusable source of truth.
   Used by: hero news bar, hero news navigation, the dedicated News
   section, and individual news article views (#news/<slug>).
   Each item: id, slug, category, title, date, excerpt, img, wide, content
------------------------------------------------------------------ */
export const newsItems = [
  {
    id: 1,
    slug: "traditional-japi-craft-revived",
    category: "Heritage Craft",
    date: "Apr 04, 2026",
    title: "Traditional Japi Craft Revived",
    excerpt: "Our artisans reimagine Assam's iconic japi with lacework, mirror and gold detailing.",
    img: "/assets/japi-feather-craft.jpg",
    wide: "/assets/hero/hero-japi.jpg",
    content: [
      "The japi is one of the most recognisable objects in Assamese life — a woven bamboo and cane sunshade that has shaded farmers in the field for generations and, in its decorated form, become a symbol of welcome and respect.",
      "At Krishnapriya Artistry we work with cane artisans from villages around Jorhat to keep that weaving tradition alive while giving it a place in contemporary homes. The base is still woven the way it always has been, from split bamboo and cane. What changes is the surface: lacework borders, mirror insets, gold detailing and fine floral patterning applied by hand.",
      "Students in our japi workshop learn the decorative process end to end — preparing the woven base, laying out a symmetrical pattern, and finishing with mirror and thread work. Every participant leaves with a finished piece of their own."
    ]
  },
  {
    id: 2,
    slug: "bihu-motifs-on-woven-bamboo",
    category: "Bamboo & Cane",
    date: "Mar 18, 2026",
    title: "Bihu Motifs on Woven Bamboo",
    excerpt: "Hand-painted folk scenes bringing rural bamboo craft into contemporary homes.",
    img: "/assets/bihu-bamboo-wall-art.jpg",
    wide: "/assets/hero/hero-bihu.jpg",
    content: [
      "Bihu is the heartbeat of the Assamese calendar, and its imagery — the dancer with her arms raised, the husori drummer, the pepa player — carries a warmth that translates beautifully onto craft surfaces.",
      "This series paints those figures directly onto woven bamboo trays and wall pieces sourced from rural artisans. The weave itself becomes part of the composition: the texture shows through the paint, so each piece reads as bamboo first and canvas second.",
      "Working this way means the artisan's weaving and the painter's brushwork share equal billing, and it opens a wider market for craftspeople whose work might otherwise stay purely functional."
    ]
  },
  {
    id: 3,
    slug: "hand-embroidery-batches-open",
    category: "Textile Art",
    date: "Feb 26, 2026",
    title: "Hand Embroidery Batches Open",
    excerpt: "Learn thread painting, ribbon work and floral wreath hoops from scratch.",
    img: "/assets/embroidery-floral-wreath.jpg",
    wide: "/assets/hero/hero-embroidery.jpg",
    content: [
      "New weekday batches are now open for hand embroidery, covering thread painting, ribbon work and finished hoop pieces.",
      "The course starts from the very beginning — how to hold a needle, how to hoop fabric at the right tension, and the handful of foundation stitches that everything else builds on. From there students move into raised ribbon florals and dense thread-painted blooms.",
      "By the end of the batch each student completes a framed wreath hoop of their own design. No prior experience is needed, and all materials are provided at the studio."
    ]
  },
  {
    id: 4,
    slug: "bottle-lamps-and-glass-painting",
    category: "Upcycling",
    date: "Jan 30, 2026",
    title: "Bottle Lamps & Glass Painting",
    excerpt: "Discarded bottles transformed into glowing mosaic and floral lamps.",
    img: "/assets/bottle-lamps.jpg",
    wide: "/assets/hero/hero-bottles.jpg",
    content: [
      "A glass bottle headed for the bin has a surprising amount of potential once light gets involved.",
      "In this series students take discarded bottles and rebuild them as lamps — some with mosaic surfaces built from cut glass pieces, others hand-painted with tulips and floral panels, all lit from within by a string of warm fairy lights.",
      "It is one of our most popular evening sessions precisely because the transformation is so immediate: you arrive with a plain bottle and leave with something that glows on a shelf at home."
    ]
  },
  {
    id: 5,
    slug: "hand-painted-kettle-collection",
    category: "Painted Décor",
    date: "Jan 12, 2026",
    title: "Hand-Painted Kettle Collection",
    excerpt: "Folk geometry and traditional palettes on everyday metalware.",
    img: "/assets/kettle-geometric.jpeg",
    wide: "/assets/hero/hero-kettle.jpg",
    content: [
      "Painted kettles have become something of a signature at the studio — ordinary metal kettles turned into display pieces through layered folk patterning.",
      "This collection leans on geometric repetition: interlocking petal forms, fine gold outlining and small floral fills, worked over deep red and near-black grounds. The restraint in the palette is deliberate, letting the density of the pattern carry the piece.",
      "The same techniques transfer directly to trays, tins and storage containers, which is where most students take them next."
    ]
  },
  {
    id: 6,
    slug: "crochet-flowers-and-amigurumi",
    category: "Crochet",
    date: "Dec 08, 2025",
    title: "Crochet Flowers & Amigurumi",
    excerpt: "Delicate roses, planters and charms hooked stitch by stitch.",
    img: "/assets/crochet-roses.jpeg",
    wide: "/assets/hero/hero-crochet.jpg",
    content: [
      "Crochet is where a lot of our students begin, because progress is visible almost immediately — a recognisable flower emerges within the first session.",
      "The class covers layered roses worked in the round, leaf and stem construction, and small hanging planters. From there students move into amigurumi charms and more structural pieces.",
      "Because the materials are inexpensive and portable, it is also the craft most students continue with at home between classes."
    ]
  },
  {
    id: 7,
    slug: "decorative-plate-painting",
    category: "Plate Art",
    date: "Nov 22, 2025",
    title: "Decorative Plate Painting",
    excerpt: "Peacocks, lotuses and folk figures turning plates into wall art.",
    img: "/assets/plate-peacock.jpg",
    wide: "/assets/hero/hero-peacock.jpg",
    content: [
      "A plate is a forgiving surface to learn composition on: the circular frame does half the work, and the eye naturally settles at the centre.",
      "This series works peacocks, cows among lotuses, and seated folk figures into that circular format, finished with a gold rim that lifts the whole piece off the wall.",
      "Students learn to plan a composition within a circle, build up opaque colour on a non-porous surface, and seal the finished plate for display."
    ]
  },
  {
    id: 8,
    slug: "cane-lampshades-by-rural-artisans",
    category: "Bamboo & Cane",
    date: "Nov 02, 2025",
    title: "Cane Lampshades by Rural Artisans",
    excerpt: "Woven cane lighting made with artisans from villages around Jorhat.",
    img: "/assets/cane-lamp-birds.jpg",
    wide: "/assets/hero/hero-canelamp.jpg",
    content: [
      "Woven cane throws a particular kind of light — the gaps in the weave cast a patterned glow that no manufactured shade quite reproduces.",
      "These lampshades are made in collaboration with artisans from villages around Jorhat, who weave the forms using techniques they have practised for decades. Our role is design direction and finishing: proportions suited to modern interiors, and a market that reaches beyond the local mela.",
      "This is the part of our mission we care most about — traditional craftsmanship reaching contemporary homes on terms that are sustainable for the artisans themselves."
    ]
  }
];

// Backwards-compatible alias: the hero carousel reads the same source.
export const heroSlides = newsItems;

/* ------------------------------------------------------------------
   CLASSES
------------------------------------------------------------------ */
export const courses = [
  {
    id: 1,
    title: "Bamboo & Cane Craft",
    desc: "Work alongside rural artisans on woven japis, lampshades and wall pieces rooted in Assamese tradition.",
    icon: "🎋",
    image: "/assets/bihu-bamboo-wall-art.jpg"
  },
  {
    id: 2,
    title: "Hand-Painted Home Décor",
    desc: "Turn kettles, plates, trays and wooden spoons into colourful heirloom pieces with folk motifs.",
    icon: "🫖",
    image: "/assets/kettle-geometric.jpeg"
  },
  {
    id: 3,
    title: "Hand & Ribbon Embroidery",
    desc: "Thread painting, ribbon florals and keepsake hoops — from first stitch to finished frame.",
    icon: "🧵",
    image: "/assets/ribbon-embroidery-hoop.jpg"
  },
  {
    id: 4,
    title: "Crochet & Amigurumi",
    desc: "Hook delicate roses, hanging planters and little charms, stitch by stitch.",
    icon: "🧶",
    image: "/assets/crochet-roses.jpeg"
  },
  {
    id: 5,
    title: "Upcycling & Glass Painting",
    desc: "Give bottles, shells and jars a second life as mosaic lamps and painted décor.",
    icon: "🏺",
    image: "/assets/bottle-lamps.jpg"
  },
  {
    id: 6,
    title: "Canvas & Acrylic Painting",
    desc: "Build confidence with colour, composition and brushwork on canvas, stone and more.",
    icon: "🎨",
    image: "/assets/canvas-golden-shower.jpg"
  }
];

/* ------------------------------------------------------------------
   WORKSHOPS
------------------------------------------------------------------ */
export const workshops = [
  {
    id: 1,
    title: "Japi & Bamboo Wall Art",
    date: "Nov 12, 2026",
    desc: "A weekend with cane artisans, decorating a traditional japi you take home.",
    img: "/assets/japi-feather-craft.jpg"
  },
  {
    id: 2,
    title: "Embroidery Keepsake Hoops",
    date: "Nov 19, 2026",
    desc: "Stitch a personalised hoop — perfect as a wedding or anniversary gift.",
    img: "/assets/embroidery-anniversary-hoop.jpg"
  },
  {
    id: 3,
    title: "Bottle Lamp & Mosaic Night",
    date: "Nov 26, 2026",
    desc: "Turn a glass bottle into a glowing mosaic lamp in a single evening session.",
    img: "/assets/bottle-lamps.jpg"
  }
];

/* ------------------------------------------------------------------
   GALLERY
------------------------------------------------------------------ */
export const galleryItems = [
  { id: 1,  title: "Japi with Feather & Mirror Work", category: "Bamboo & Cane",  img: "/assets/japi-feather-craft.jpg",         span: "col-2" },
  { id: 2,  title: "Bihu Dancers on Woven Bamboo",    category: "Bamboo & Cane",  img: "/assets/bihu-bamboo-wall-art.jpg",       span: "row-2" },
  { id: 3,  title: "Ribbon Embroidery Hoop",          category: "Textile Art",    img: "/assets/ribbon-embroidery-hoop.jpg",     span: "" },
  { id: 4,  title: "Floral Wreath Embroidery",        category: "Textile Art",    img: "/assets/embroidery-floral-wreath.jpg",   span: "" },
  { id: 5,  title: "Peacock Plate Painting",          category: "Plate Art",      img: "/assets/plate-peacock.jpg",              span: "row-2" },
  { id: 6,  title: "Cow & Lotus Plate",               category: "Plate Art",      img: "/assets/plate-cow-lotus.jpg",            span: "" },
  { id: 7,  title: "Mosaic Bottle Lamps",             category: "Upcycling",      img: "/assets/bottle-lamps.jpg",               span: "" },
  { id: 8,  title: "Cane Lampshade at Dusk",          category: "Bamboo & Cane",  img: "/assets/cane-lamp-birds.jpg",            span: "row-2" },
  { id: 9,  title: "Golden Shower on Canvas",         category: "Painting",       img: "/assets/canvas-golden-shower.jpg",       span: "" },
  { id: 10, title: "Embroidered Umbrellas",           category: "Textile Art",    img: "/assets/embroidered-umbrellas.jpg",      span: "" },
  { id: 11, title: "Hand-Painted Wooden Spoons",      category: "Painted Décor",  img: "/assets/painted-wooden-spoons.jpg",      span: "" },
  { id: 12, title: "Geometric Painted Kettle",        category: "Painted Décor",  img: "/assets/kettle-geometric.jpeg",          span: "col-2" },
  { id: 13, title: "Crochet Rose Collection",         category: "Crochet",        img: "/assets/crochet-roses.jpeg",             span: "" },
  { id: 14, title: "Sleeping Cat Pebble Art",         category: "Painting",       img: "/assets/pebble-cat-painting.jpg",        span: "" },
  { id: 15, title: "Anniversary Keepsake Hoop",       category: "Textile Art",    img: "/assets/embroidery-anniversary-hoop.jpg",span: "" },
  { id: 16, title: "Lamp-Lit Plate Corner",           category: "Home Styling",   img: "/assets/plate-lady-lamp-corner.jpg",     span: "" },
  { id: 17, title: "Hanging Lantern Glow",            category: "Home Styling",   img: "/assets/lamp-red-hanging.jpg",           span: "" },
  { id: 18, title: "Crochet Hanging Planter",         category: "Crochet",        img: "/assets/crochet-planter.jpg",            span: "" },
  { id: 19, title: "Painted Shell & Bottle Art",      category: "Upcycling",      img: "/assets/shell-bottle-art.jpeg",          span: "" },
  { id: 20, title: "Cane Mirror with Glasswork",      category: "Wall Décor",     img: "/assets/mirror-decor.jpg",               span: "" }
];

export const galleryFilters = [
  "All",
  "Bamboo & Cane",
  "Textile Art",
  "Painted Décor",
  "Plate Art",
  "Crochet",
  "Upcycling",
  "Painting"
];

/* ------------------------------------------------------------------
   TESTIMONIALS
------------------------------------------------------------------ */
export const testimonials = [
  {
    id: 1,
    name: "Anamika D.",
    role: "Weekend Batch Student",
    quote: "I walked in not knowing how to hold a brush and walked out with a kettle I painted myself. The teachers are so patient."
  },
  {
    id: 2,
    name: "Rupam & Momi",
    role: "Parents",
    quote: "Our daughter looks forward to her crochet class all week. She's made flowers for the whole family now!"
  },
  {
    id: 3,
    name: "Deepshikha B.",
    role: "Workshop Attendee",
    quote: "Learning japi craft from artisans who've done it their whole lives was something I'll never forget."
  }
];
