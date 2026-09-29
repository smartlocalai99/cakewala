import { photo } from "@/data/cakes";

// Slides for the offers / today's specials carousel above the cake list.
//
// When a slide shows (India time):
//   days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]  only on these weekdays
//   from / to: "2026-10-20"                                   only between these dates (inclusive)
//   Leave both out to show the slide every day.
//
// imagePosition (optional) moves the photo's crop, e.g. "50% 20%" to show more of the top.
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
    text: "Dutch chocolate, choco truffle, opera and more.",
    button: "See chocolate cakes",
    show: { flavour: "Chocolate" },
    days: ["Mon"],
    image: photo("1715533482956-4a8a362b863c", 1800),
    imagePosition: "50% 25%",
  },
  {
    id: "red-velvet-tuesday",
    label: "Today's special",
    title: "Red Velvet Tuesday",
    text: "Velvety layers with smooth cream frosting.",
    button: "See red velvet cakes",
    show: { flavour: "Red Velvet" },
    days: ["Tue"],
    image: photo("1586788680434-30d324b2d46f", 1800),
  },
  {
    id: "butterscotch-wednesday",
    label: "Today's special",
    title: "Butterscotch Wednesday",
    text: "Caramel crunch on a soft golden sponge.",
    button: "See butterscotch cakes",
    show: { flavour: "Butterscotch" },
    days: ["Wed"],
    image: photo("1571050045617-cbbd5e68d181", 1800),
    imagePosition: "50% 30%",
  },
  {
    id: "fruit-thursday",
    label: "Today's special",
    title: "Fresh Fruit Thursday",
    text: "Strawberry, blueberry, pineapple and fresh fruit.",
    button: "See fruit cakes",
    show: { flavour: "Fruit" },
    days: ["Thu"],
    image: photo("1568827999250-3f6afff96e66", 1800),
    imagePosition: "50% 20%",
  },
  {
    id: "black-forest-friday",
    label: "Today's special",
    title: "Black Forest Friday",
    text: "Classic, German, mango and white forest.",
    button: "See Black Forest cakes",
    show: { flavour: "Black Forest" },
    days: ["Fri"],
    image: photo("1779282312464-d556d852daa4", 1800),
    imagePosition: "50% 30%",
  },
  {
    id: "weekend-celebrations",
    label: "Weekend special",
    title: "Weekend celebrations",
    text: "Birthday cakes, ready for the candles.",
    button: "See birthday cakes",
    show: { occasion: "Birthday" },
    days: ["Sat", "Sun"],
    image: photo("1589218909732-f304d13fbf2c", 1800),
  },
  {
    id: "anniversary-picks",
    label: "Top pick",
    title: "Anniversary cakes",
    text: "Elegant cakes for your special day.",
    button: "See anniversary cakes",
    show: { occasion: "Anniversary" },
    image: photo("1655411880489-2f0d18785863", 1800),
  },
  {
    id: "eggless",
    label: "Top pick",
    title: "Eggless for every occasion",
    text: "Look for the green mark on each cake.",
    button: "See eggless cakes",
    show: { eggless: true },
    image: photo("1641848373324-bc744c442d5b", 1800),
    imagePosition: "50% 20%",
  },
];
