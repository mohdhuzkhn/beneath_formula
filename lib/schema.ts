import { z } from "zod";
import { depths, levels, subjects, tags, relations } from "./taxonomy";
const id = z.string().regex(/^[a-z][a-z0-9-]*$/);
const url = z.url().refine((v) => /^https:\/\//.test(v), "Use HTTPS URLs");
const date = z.iso.date();
const reference = z
  .object({
    id,
    title: z.string().min(1),
    authors: z.array(z.string()).default([]),
    year: z.number().int().optional(),
    publisher: z.string().optional(),
    url: url.optional(),
    doi: z
      .string()
      .regex(/^10\.\d{4,9}\/.+$/)
      .optional(),
    isbn: z.string().optional(),
    pages: z.string().optional(),
  })
  .refine(
    (r) => r.url || r.doi || r.isbn,
    "Reference needs a retrievable source",
  );
const common = {
  id,
  slug: id,
  title: z.string().min(3),
  summary: z.string().min(10),
  authorId: z.literal("muhammad-huzaifa"),
  locale: z.enum(["en", "ur"]).default("en"),
  status: z.enum(["draft", "in_review", "published", "archived"]),
  demo: z.boolean().default(false),
  subjects: z.array(z.enum(subjects)).min(1),
  levels: z.array(z.enum(levels)).min(1),
  depths: z.array(z.enum(depths)).min(1),
  tags: z.array(z.enum(tags)).default([]),
  publishedAt: date.optional(),
  updatedAt: date.optional(),
  prerequisites: z.array(id).default([]),
  connections: z
    .array(z.object({ type: z.enum(relations), target: id }))
    .default([]),
  labIds: z.array(id).default([]),
  videoIds: z.array(id).default([]),
  references: z.array(reference).default([]),
  revisions: z
    .array(z.object({ date, description: z.string().min(1) }))
    .default([]),
  license: z.string().default("All rights reserved"),
  whyItMatters: z.string().min(10),
  aliases: z.array(z.string().regex(/^\/[a-z0-9/-]+$/)).default([]),
};
const inquiry = {
  inquiryKind: z.enum([
    "Expository Essay",
    "Study Notes",
    "Literature Review",
    "Reproducible Investigation",
    "Preprint",
    "Peer-Reviewed Publication",
  ]),
  researchStatus: z.enum([
    "demonstration",
    "in_progress",
    "complete",
    "preprint",
    "peer_reviewed",
  ]),
  abstract: z.string().min(10),
  version: z.string().min(1),
  methods: z.string().min(1),
  limitations: z.string().min(1),
  peerReviewed: z.boolean().default(false),
  evidenceUrl: url.optional(),
  doi: z
    .string()
    .regex(/^10\.\d{4,9}\/.+$/)
    .optional(),
  repositoryUrl: url.optional(),
  dataUrl: url.optional(),
  disclosures: z.string().default("No disclosures supplied."),
};
export const contentSchema = z
  .discriminatedUnion("kind", [
    z.object({ ...common, kind: z.literal("concept") }),
    z.object({ ...common, kind: z.literal("essay") }),
    z.object({ ...common, kind: z.literal("derivation") }),
    z.object({ ...common, ...inquiry, kind: z.literal("investigation") }),
    z.object({ ...common, ...inquiry, kind: z.literal("literature_review") }),
    z.object({ ...common, ...inquiry, kind: z.literal("publication") }),
    z.object({
      ...common,
      kind: z.literal("lecture"),
      youtubeVideoId: z
        .string()
        .regex(/^[A-Za-z0-9_-]{11}$/)
        .optional(),
      videoApproved: z.boolean().default(false),
      playlistId: z
        .string()
        .regex(/^[A-Za-z0-9_-]+$/)
        .optional(),
      durationSeconds: z.number().int().positive().optional(),
      timestamps: z
        .array(
          z.object({
            seconds: z.number().int().nonnegative(),
            label: z.string().min(1),
          }),
        )
        .default([]),
      captionsUrl: url.optional(),
      transcript: z.string().optional(),
    }),
    z.object({
      ...common,
      kind: z.literal("lab"),
      componentId: z.literal("secant-tangent"),
      learningGoals: z.array(z.string()).min(1),
      accessibilitySummary: z.string().min(1),
      parameterRanges: z.object({
        x: z.tuple([z.number(), z.number()]),
        h: z.tuple([z.number(), z.number()]),
      }),
    }),
    z.object({
      ...common,
      kind: z.literal("learning_path"),
      audience: z.string().min(1),
      entryRequirements: z.array(z.string()),
      learningOutcomes: z.array(z.string()).min(1),
      orderedContentIds: z.array(id).min(1),
      optionalBranches: z.array(id).default([]),
    }),
    z.object({
      ...common,
      kind: z.literal("glossary"),
      term: z.string(),
      notation: z.string(),
      definition: z.string(),
      searchAliases: z.array(z.string()).default([]),
    }),
  ])
  .superRefine((v, ctx) => {
    const error = (message: string) =>
      ctx.addIssue({ code: "custom", message });
    if (v.status === "published" && !v.publishedAt)
      error("Published content requires publishedAt");
    if (v.updatedAt && v.publishedAt && v.updatedAt < v.publishedAt)
      error("updatedAt precedes publishedAt");
    if (
      "peerReviewed" in v &&
      (v.peerReviewed ||
        v.researchStatus === "peer_reviewed" ||
        v.inquiryKind === "Peer-Reviewed Publication") &&
      !(
        v.peerReviewed &&
        v.evidenceUrl &&
        v.researchStatus === "peer_reviewed" &&
        v.inquiryKind === "Peer-Reviewed Publication"
      )
    )
      error("Peer review requires consistent labels and verified evidence");
    if ("peerReviewed" in v && v.demo && v.peerReviewed)
      error("Demonstrations cannot claim peer review");
    if (v.kind === "lecture" && v.youtubeVideoId && !v.videoApproved)
      error("Video needs explicit owner approval");
    if (
      v.kind === "lecture" &&
      v.timestamps.some(
        (t, i) =>
          (i > 0 && t.seconds <= v.timestamps[i - 1].seconds) ||
          (v.durationSeconds !== undefined && t.seconds >= v.durationSeconds),
      )
    )
      error("Timestamps must increase and be within duration");
    if (
      v.kind === "lab" &&
      Object.values(v.parameterRanges).some(([min, max]) => min >= max)
    )
      error("Parameter ranges must increase");
  });
export type ContentMeta = z.infer<typeof contentSchema>;
export type Article = ContentMeta & { body: string; file: string };
