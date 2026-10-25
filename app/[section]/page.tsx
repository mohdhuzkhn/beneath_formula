import { Discovery } from "../../components/Discovery";
import type { Filters } from "../../lib/search";
import Link from "../../components/Link";
import { notFound } from "next/navigation";
import { published } from "../../lib/content";
import { site } from "../../lib/site";
import { Card } from "../../components/Card";
import { Empty, Heading } from "../../components/Editorial";
const pages: Record<string, [string, string]> = {
  explore: [
    "Explore the ideas",
    "Follow a question, a subject, or a level of understanding.",
  ],
  paths: ["Learning paths", "Build understanding in a deliberate sequence."],
  lab: [
    "The visual lab",
    "Change a parameter. Notice a pattern. Ask why it happens.",
  ],
  "math-to-ai": [
    "From mathematics to AI",
    "A bridge from mathematical foundations toward computation.",
  ],
  inquiry: [
    "Inquiry & writing",
    "Methods, proofs, limitations and corrections in plain sight.",
  ],
  lectures: [
    "Watch. Then work through it.",
    "Lecture companions connect video with written mathematics.",
  ],
  about: [
    "A space for the why",
    "Mathematical exploration by Muhammad Huzaifa.",
  ],
  teaching: [
    "Teaching through understanding",
    "Ideas before shortcuts. Explanation alongside practice.",
  ],
  contact: [
    "Start a conversation",
    "Professional inquiries and mathematical corrections.",
  ],
  search: ["Find an idea", "Search the published mathematical collection."],
  privacy: [
    "Privacy",
    "A deliberately minimal approach to personal information.",
  ],
  terms: ["Terms of use", "Educational material and responsible use."],
  copyright: [
    "Copyright & attribution",
    "Respect authorship, sources and permissions.",
  ],
};
export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  return {
    title: `${pages[section]?.[0] || "Not found"} | ${site.name}`,
    description: pages[section]?.[1],
    alternates: { canonical: `/${section}` },
  };
}
export default async function Section({
  params,
  searchParams,
}: {
  params: Promise<{ section: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const raw = await searchParams;
  const filters: Filters = Object.fromEntries(
    Object.entries(raw)
      .filter(([, v]) => typeof v === "string")
      .map(([k, v]) => [k, String(v).slice(0, 200)]),
  );
  const { section } = await params;
  const page = pages[section];
  if (!page) notFound();
  const items = published();
  const selected =
    section === "paths"
      ? items.filter((i) => i.kind === "learning_path")
      : section === "lab"
        ? items.filter((i) => i.kind === "lab")
        : section === "lectures"
          ? items.filter((i) => i.kind === "lecture")
          : section === "inquiry"
            ? items.filter((i) =>
                [
                  "investigation",
                  "literature_review",
                  "publication",
                  "essay",
                ].includes(i.kind),
              )
            : items;
  return (
    <>
      <Heading
        eyebrow={section.replaceAll("-", " ")}
        title={page[0]}
        summary={page[1]}
      />
      {["explore", "paths", "lab", "lectures", "inquiry", "search"].includes(
        section,
      ) ? (
        <>
          {section === "paths" && (
            <div className="notice">
              The Class XII calculus demonstration is ready to explore.
              Dedicated IX, X and XI sequences will appear when reviewed
              material is available.
            </div>
          )}
          {section === "inquiry" && (
            <div className="notice">
              No verified publications or peer-reviewed papers have been
              supplied. Demonstrations are identified individually.
            </div>
          )}
          {["explore", "search", "inquiry"].includes(section) ? (
            <Discovery
              filters={filters}
              action={`/${section}`}
              allowedKinds={
                section === "inquiry"
                  ? [
                      "investigation",
                      "literature_review",
                      "publication",
                      "essay",
                    ]
                  : undefined
              }
            />
          ) : (
            <div className="grid">
              {selected.map((i) => (
                <Card item={i} key={i.id} />
              ))}
            </div>
          )}
          {!selected.length && (
            <Empty>No published material in this collection yet.</Empty>
          )}
        </>
      ) : (
        <div className="prose">
          {section === "math-to-ai" ? (
            <>
              <h2>Begin with change</h2>
              <p>
                Derivatives describe local change. Partial derivatives extend
                the question to functions of several variables; gradients
                collect those partial derivatives. Optimization uses such
                information in some, but not all, machine learning methods.
              </p>
              <ol>
                <li>
                  <Link prefetch={false} href="/concepts/what-is-a-derivative">
                    Explore a derivative
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href="/lab/secant-to-tangent">
                    Test a slope visually
                  </Link>
                </li>
                <li>
                  Partial derivatives and gradients — material not yet
                  published.
                </li>
                <li>Gradient descent — material not yet published.</li>
              </ol>
              <p>This is a foundation bridge, not a complete AI course.</p>
            </>
          ) : section === "about" ? (
            <>
              <h2>Beyond remembering formulas</h2>
              <p>
                {site.name} is an independent mathematical exploration platform
                associated with {site.author}. It connects school foundations
                with proofs, visual experiments and transparent inquiry.
              </p>
              <p>
                The initial collection is an AI-assisted engineering
                demonstration awaiting author review. No degrees, affiliations,
                teaching outcomes or research credentials are asserted.
              </p>
              <p>
                <a href={site.portfolio}>
                  AI Engineering Second Brain on GitHub
                </a>{" "}
                is a separate project. The Science Squad is an associated
                coaching institution; this site remains an individual
                mathematical space.
              </p>
            </>
          ) : section === "teaching" ? (
            <>
              <h2>A proposed teaching approach</h2>
              <p>
                Begin with a question, surface the prerequisites, develop the
                reasoning, and use examples to test understanding. This is the
                platform’s proposed teaching approach, awaiting the author’s
                personal profile.
              </p>
              <h2>Sample explanations</h2>
              <p>
                <Link prefetch={false} href="/concepts/what-is-a-derivative">
                  Derivative intuition
                </Link>{" "}
                pairs with an{" "}
                <Link
                  prefetch={false}
                  href="/derivations/derivative-of-a-square"
                >
                  algebraic proof
                </Link>{" "}
                and an interactive lab.
              </p>
              <p>
                Verified experience, qualifications and a CV have not been
                supplied. No download or credential is implied.
              </p>
              <Link prefetch={false} href="/contact">
                Professional contact →
              </Link>
            </>
          ) : section === "contact" ? (
            <>
              {site.email ? (
                <p>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </p>
              ) : (
                <Empty>
                  A professional contact address has not yet been configured. No
                  messages are collected by this site.
                </Empty>
              )}
              <p>
                For a mathematical correction, include the page address, the
                statement in question and supporting reasoning. Do not send
                student identifiers or sensitive personal information.
              </p>
            </>
          ) : section === "privacy" ? (
            <>
              <p>
                This site does not use reader accounts, advertising, or
                third-party analytics. When engagement storage is configured, it
                records aggregate page-view totals and one anonymous follow
                token per browser. It does not collect names, email addresses,
                IP addresses, or browsing profiles. Theme preference is stored
                locally in your browser.
              </p>
              <p>
                A YouTube player loads only when you choose to load an approved
                video. YouTube may then receive your IP address and browser
                information and apply its own storage and privacy policies.
                Privacy-enhanced embedding does not mean zero third-party data
                collection.
              </p>
              <p>
                The eventual hosting provider may process access logs for
                delivery and security. Hosting identity, retention and the
                contact channel must be finalized before public release. This
                local build is not a claim of an active production service.
              </p>
            </>
          ) : section === "terms" ? (
            <>
              <p>
                Material is offered for educational exploration. Demonstrations
                are not a complete syllabus, a professional certification, or
                peer-reviewed research. Check assumptions and consult cited
                sources.
              </p>
              <p>
                Report errors through the configured contact channel when
                available. Do not submit confidential or student personal
                information. Third-party services have their own terms.
              </p>
            </>
          ) : (
            <>
              <p>
                Content rights follow each record’s license. Demonstration
                material is labeled. Do not redistribute third-party figures,
                text or videos without appropriate permission.
              </p>
              <p>
                Source dependencies retain their respective licenses. Links and
                embeds do not transfer ownership of external material. No
                textbook scans or student photographs are hosted.
              </p>
            </>
          )}
        </div>
      )}
    </>
  );
}
