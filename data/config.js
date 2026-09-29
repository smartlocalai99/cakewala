// Single place to update contact details when the real shop info is ready.
export const shopConfig = {
  name: "Cakewala",
  tagline: "Freshly Baked Happiness",
  whatsappNumber: "919876543210", // placeholder, replace with the real number
  phoneNumber: "+91 98765 43210",
  location: "Kadapa, Andhra Pradesh",
  hours: "10:00 AM – 9:00 PM",
};

export function buildWhatsAppLink(cakeName) {
  const message = `Hi Cakewala, I'm interested in the ${cakeName}.`;
  return `https://wa.me/${shopConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
