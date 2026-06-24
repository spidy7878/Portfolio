/**
 * Testimonials — PLACEHOLDER content. Replace quotes/names/companies with real
 * client feedback when available.
 */

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Gradient (hex) for the avatar monogram. */
  gradient: [string, string];
  rating?: number;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Anas didn't just build what we asked for — he pushed back where it mattered and shipped something better. Our compliance audit went from a month of dread to a single afternoon.",
    name: "A. Whitman",
    role: "COO",
    company: "Healthcare SaaS",
    gradient: ["#3b6fff", "#7b5bff"],
    rating: 5,
  },
  {
    quote:
      "The POS just works — even when our internet doesn't. Sixty locations, zero lost orders. He understood our business before he wrote a line of code.",
    name: "M. Reyes",
    role: "Founder",
    company: "Restaurant Group",
    gradient: ["#ff7a59", "#ff4f9a"],
    rating: 5,
  },
  {
    quote:
      "Genuinely senior. Clear communication, sensible architecture and zero drama. He took ownership of the whole delivery and treated our deadlines like his own.",
    name: "S. Kohli",
    role: "CTO",
    company: "B2B Startup",
    gradient: ["#1f9d8f", "#3b6fff"],
    rating: 5,
  },
  {
    quote:
      "Our automation platform now handles work that used to eat two full days a week. It's reliable, observable and easy to extend. Worth every penny.",
    name: "J. Berg",
    role: "Head of Ops",
    company: "Logistics",
    gradient: ["#3b6fff", "#1f9d8f"],
    rating: 5,
  },
  {
    quote:
      "He turned a messy, real-world tailoring workflow into software that the whole team actually enjoys using. Errors down, throughput up — immediately.",
    name: "F. Noor",
    role: "Owner",
    company: "Bespoke Atelier",
    gradient: ["#8b5bff", "#c44fff"],
    rating: 5,
  },
  {
    quote:
      "Fast, thoughtful and reliable. He's the rare engineer who cares as much about the outcome as the code. We'll be working with him again.",
    name: "D. Park",
    role: "Product Lead",
    company: "Fintech",
    gradient: ["#00b4d8", "#3b6fff"],
    rating: 5,
  },
];
