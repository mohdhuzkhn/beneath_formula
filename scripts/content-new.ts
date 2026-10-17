import fs from "node:fs";
import { kinds } from "../lib/taxonomy";
const [kind = "concept", slug] = process.argv.slice(2);
if (
  !slug ||
  !kinds.includes(kind as (typeof kinds)[number]) ||
  !/^[a-z][a-z0-9-]*$/.test(slug)
)
  throw new Error("Usage: npm run content:new -- concept valid-slug");
const common = {
  id: `${kind.replaceAll("_", "-")}-${slug}`,
  slug,
  kind,
  status: "draft",
  title: "Replace this title",
  summary: "Replace this summary with a precise explanation.",
  authorId: "muhammad-huzaifa",
  subjects: ["calculus/differentiation"],
  levels: ["XII"],
  depths: ["foundation"],
  whyItMatters: "Explain why this idea matters to the reader.",
  references: [],
};
const extra =
  kind === "learning_path"
    ? {
        audience: "Describe intended learners",
        entryRequirements: [],
        learningOutcomes: ["Describe a concrete outcome"],
        orderedContentIds: [],
      }
    : kind === "lab"
      ? {
          componentId: "secant-tangent",
          learningGoals: ["Explore a mathematical limit"],
          accessibilitySummary:
            "Numeric controls and a table accompany the plot.",
          parameterRanges: { x: [-2, 2], h: [-2, 2] },
        }
      : ["investigation", "literature_review", "publication"].includes(kind)
        ? {
            inquiryKind: "Study Notes",
            researchStatus: "in_progress",
            abstract: "Replace with an accurate abstract.",
            version: "0.1",
            methods: "Describe methods.",
            limitations: "Describe limitations.",
            peerReviewed: false,
          }
        : kind === "glossary"
          ? { term: slug, notation: "", definition: "Replace this definition." }
          : {};
fs.mkdirSync("content", { recursive: true });
fs.writeFileSync(
  `content/${slug}.mdx`,
  `---\n${JSON.stringify({ ...common, ...extra }, null, 2)}\n---\n\n## Motivation\n\nWrite reviewed content here.\n`,
  { flag: "wx" },
);
console.log(
  `Created draft content/${slug}.mdx. Fill required metadata before validation.`,
);
