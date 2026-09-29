import { photo } from "@/data/cakes";

// Slides for the offers / today's specials carousel above the cake list.
//
// When a slide shows (India time):
//   days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]  only on these weekdays
//   from / to: "2026-10-20"                                   only between these dates (inclusive)
//   Leave both out to show the slide every day.
//
// What the button does, via `show`:
//   { occasion: "Birthday" } · { flavour: "Chocolate" } · { eggless: true }
//
// Example of a dated offer:
//   { id: "diwali", label: "Offer", title: "Diwali specials", text: "...",
//     button: "See cakes", show: { occasion: "Birthday" },
//     from: "2026-11-05", to: "2026-11-09", image: photo("...", 1800) },

export const specials = [
  {
    id: "chocolate-monday",
    label: "Today's special",
    title: "Chocolate Monday",
    text: "Rich chocolate cakes, baked fresh this morning.",
    button: "See chocolate cakes",
    show: { flavour: "Chocolate" },
    days: ["Mon"],
    image: photo("1578985545062-69928b1d9587", 1800),
  },
  {
    id: "red-velvet-tuesday",
    label: "Today's special",
    title: "Red Velvet Tuesday",
    text: "Velvety layers with cream cheese frosting.",
    button: "See red velvet cakes",
    show: { flavour: "Red Velvet" },
    days: ["Tue"],
    image: photo("1616541823729-00fe0aacd32c", 1800),
  },
  {
    id: "butterscotch-wednesday",
    label: "Today's special",
    title: "Butterscotch Wednesday",
    text: "Caramel, crunch and a soft golden sponge.",
    button: "See butterscotch cakes",
    show: { flavour: "Butterscotch" },
    days: ["Wed"],
    image: photo("1602351447937-745cb720612f", 1800),
  },
  {
    id: "fruit-thursday",
    label: "Today's special",
    title: "Fresh Fruit Thursday",
    text: "Strawberries, blueberries and light cream.",
    button: "See fruit cakes",
    show: { flavour: "Fruit" },
    days: ["Thu"],
    image: photo("1611293388250-580b08c4a145", 1800),
  },
  {
    id: "cupcake-friday",
    label: "Today's special",
    title: "Cupcake Friday",
    text: "Little cakes for big parties.",
    button: "See cupcakes",
    show: { flavour: "Cupcakes" },
    days: ["Fri"],
    image: photo("1550617931-e17a7b70dce2", 1800),
  },
  {
    id: "black-forest-weekend",
    label: "Weekend special",
    title: "Black Forest Weekend",
    text: "Dark chocolate, cream and juicy cherries.",
    button: "See Black Forest cakes",
    show: { flavour: "Black Forest" },
    days: ["Sat", "Sun"],
    image: photo("1605807646983-377bc5a76493", 1800),
  },
  {
    id: "anniversary-picks",
    label: "Top pick",
    title: "Anniversary cakes",
    text: "Roses, hearts and elegant tiers for your day.",
    button: "See anniversary cakes",
    show: { occasion: "Anniversary" },
    image: photo("1635349135195-ea08a39fcc5c", 1800),
  },
  {
    id: "eggless",
    label: "Top pick",
    title: "Eggless for every occasion",
    text: "Look for the green mark on each cake.",
    button: "See eggless cakes",
    show: { eggless: true },
    image: photo("1558301211-0d8c8ddee6ec", 1800),
  },
];
