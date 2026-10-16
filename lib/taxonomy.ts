export const kinds = [
  "concept",
  "essay",
  "derivation",
  "investigation",
  "literature_review",
  "publication",
  "lab",
  "lecture",
  "learning_path",
  "glossary",
] as const;
export const levels = [
  "IX",
  "X",
  "XI",
  "XII",
  "undergraduate",
  "advanced",
  "AI-ML",
] as const;
export const depths = [
  "intuition",
  "foundation",
  "rigorous",
  "advanced",
] as const;
export const subjects = [
  "algebra",
  "trigonometry",
  "geometry",
  "calculus/limits",
  "calculus/differentiation",
  "calculus/optimization",
  "linear-algebra/matrices",
  "discrete-mathematics",
  "probability-statistics",
  "mathematical-history",
] as const;
export const tags = [
  "limits",
  "rate-of-change",
  "proof",
  "visualization",
  "optimization",
  "foundations",
] as const;
export const relations = [
  "builds_on",
  "application_of",
  "generalizes",
  "related_to",
  "historically_connected_to",
] as const;
export const sections: Record<(typeof kinds)[number], string> = {
  concept: "concepts",
  essay: "essays",
  derivation: "derivations",
  investigation: "inquiry",
  literature_review: "inquiry",
  publication: "inquiry",
  lab: "lab",
  lecture: "lectures",
  learning_path: "paths",
  glossary: "glossary",
};
export const labels: Record<(typeof kinds)[number], string> = {
  concept: "Concept",
  essay: "Expository essay",
  derivation: "Derivation",
  investigation: "Reproducible investigation",
  literature_review: "Literature review",
  publication: "Publication record",
  lab: "Visual lab",
  lecture: "Lecture",
  learning_path: "Learning path",
  glossary: "Glossary",
};
