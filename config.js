/*
 * SALES PAGE SETTINGS — edit only this file.
 *
 * Rules:
 * - Leave a field as "" (empty) while the information is not confirmed.
 *   The page shows it as pending instead of inventing a value.
 * - The purchase button only becomes active when ALL of these are true:
 *     checkout.url is a real https:// link,
 *     checkout.internationalExperienceVerified === true,
 *     price.confirmed === true,
 *     product.englishMaterialsReady === true.
 * - Never put passwords, API keys or tokens here. This file is public.
 * - Set testMode to false only for the final public version.
 */
window.SALES_CONFIG = {
  // true = shows the "test version" bar and the "Pending" labels.
  testMode: false,

  product: {
    name: "Your First Website with AI",
    // Set to true only after templates, guide, prompts and checklist
    // have all been translated and reviewed in English.
    // Status (2026-10-01): English versions drafted in your-first-website-with-ai-kit/.
    // Still pending: your own review of the text and a test with beginners.
    englishMaterialsReady: false,
  },

  price: {
    amount: 19.90,          // proposed test price
    currency: "USD",
    billing: "One-time payment",
    confirmed: true,    // set to true after confirming the price
  },

  checkout: {
    url: "",                                // real Kiwify (or other) checkout link, https://...
    internationalExperienceVerified: false, // true only after testing a purchase flow from outside Brazil
  },

  seller: {
    publicName: "Carlos Eduardo",      // public seller or brand name
  },

  support: {
    channel: "ogundelecarlos@gmail.com",         // e.g. "Email: support@yourdomain.com" — only a real, monitored channel
    url: "mailto:ogundelecarlos@gmail.com",             // optional link: https://... or mailto:...
    responseTime: "3–5 days",    // e.g. "within 2 business days" — only if you can keep it
  },

  // How the buyer receives the files after purchase (e.g. "Download link sent by email after payment is approved.").
  delivery: "",

  // Guarantee / refund terms exactly as confirmed with the platform and applicable law.
  guarantee: "",

  legal: {
    termsUrl: "",
    privacyUrl: "",
    refundUrl: "",
  },

  // Final public address of this sales page (used in the canonical tag).
  siteUrl: "https://site-ingles-kiwify.vercel.app/",

  // The three templates. "file" is the file name inside the buyer's package.
  // demoUrl points to a fictional demo in /demos (published together with this page,
  // so a relative path works). previewImage is a real screenshot of that demo in /previews.
  templates: [
    {
      file: "01-service-providers.html",
      title: "Service providers",
      purpose: "For people who offer a service and want to explain what they do, where they work and how to request a quote.",
      sections: "Intro, services, about, how it works, FAQ, WhatsApp contact button",
      demoUrl: "demos/service-providers.html",
      previewImage: "previews/service-providers.jpg",
      previewAlt: "Screenshot of a fictional demo made with the Service providers template: a light page for a made-up home repair business with the headline “Your space in good hands.” and three service cards.",
    },
    {
      file: "02-sports-school.html",
      title: "Sports schools",
      purpose: "For sports schools and coaches who want to present classes, how a first visit works and how parents or students can get in touch.",
      sections: "Intro, programs, about, how it works, FAQ, WhatsApp contact button",
      demoUrl: "demos/sports-school.html",
      previewImage: "previews/sports-school.jpg",
      previewAlt: "Screenshot of a fictional demo made with the Sports schools template: a dark navy page for a made-up youth soccer school with the headline “The next step starts at practice.” and lime green accents.",
    },
    {
      file: "03-independent-professional.html",
      title: "Independent professionals",
      purpose: "For freelancers and solo professionals who want a simple page that introduces their work and the way they serve clients.",
      sections: "Intro, services, about, how it works, FAQ, WhatsApp contact button",
      demoUrl: "demos/independent-professional.html",
      previewImage: "previews/independent-professional.jpg",
      previewAlt: "Screenshot of a fictional demo made with the Independent professionals template: a cream and wine-colored page for a made-up illustration studio with the headline “Good ideas deserve a good introduction.”",
    },
  ],
};

