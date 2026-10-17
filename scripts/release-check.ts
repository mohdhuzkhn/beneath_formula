import { site } from "../lib/site";
const errors = [];
if (
  !site.url.startsWith("https://") ||
  new URL(site.url).hostname === "localhost"
)
  errors.push("Set an owner-controlled HTTPS NEXT_PUBLIC_SITE_URL");
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(site.email))
  errors.push("Set verified NEXT_PUBLIC_CONTACT_EMAIL");
if (process.env.EDITORIAL_APPROVED !== "true")
  errors.push(
    "Owner must review demo content and branding; set EDITORIAL_APPROVED=true only after actual approval",
  );
if (process.env.HOSTING_PRIVACY_REVIEWED !== "true")
  errors.push(
    "Finalize hosting identity/retention in privacy page and set HOSTING_PRIVACY_REVIEWED=true",
  );
if (errors.length)
  throw new Error(`Public release blocked:\n- ${errors.join("\n- ")}`);
console.log(
  "Configuration release gates passed. Live HTTPS and smoke verification still required.",
);
