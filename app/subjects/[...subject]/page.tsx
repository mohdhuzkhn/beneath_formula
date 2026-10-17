import { notFound } from "next/navigation";
import { subjects } from "../../../lib/taxonomy";
import { Heading } from "../../../components/Editorial";
import { Discovery } from "../../../components/Discovery";
export function generateStaticParams() {
  return subjects.map((subject) => ({ subject: subject.split("/") }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string[] }>;
}) {
  const { subject } = await params;
  return {
    title: `Explore ${subject.join(" / ")}`,
    description: `Published explanations, proofs and labs in ${subject.join(" / ")}.`,
    alternates: { canonical: `/subjects/${subject.join("/")}` },
  };
}
export default async function Subject({
  params,
}: {
  params: Promise<{ subject: string[] }>;
}) {
  const { subject } = await params;
  const id = subject.join("/");
  if (!subjects.some((s) => s === id)) notFound();
  return (
    <>
      <Heading
        eyebrow="Mathematical subject"
        title={id.replaceAll("/", " / ").replaceAll("-", " ")}
        summary="Explore connected explanations, derivations and experiments."
      />
      <Discovery filters={{ subject: id }} />
    </>
  );
}
