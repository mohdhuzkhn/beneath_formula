import { notFound } from "next/navigation";
import { levels } from "../../../lib/taxonomy";
import { Heading } from "../../../components/Editorial";
import { Discovery } from "../../../components/Discovery";
export function generateStaticParams() {
  return levels.map((level) => ({ level }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = await params;
  return {
    title: `${level} mathematics`,
    description: `Published mathematical ideas for ${level} learners.`,
    alternates: { canonical: `/levels/${level}` },
  };
}
export default async function Level({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = await params;
  if (!levels.some((l) => l === level)) notFound();
  return (
    <>
      <Heading
        eyebrow="Learning level"
        title={`${level} mathematics`}
        summary="Universal mathematical ideas, with no unverified board-specific alignment."
      />
      <Discovery filters={{ level }} />
    </>
  );
}
