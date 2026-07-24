import { notFound } from "next/navigation";
import { projects } from "../../../lib/data";
import CaseStudyClient from "./CaseStudyClient";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return { title: "Not Found" };
  return {
    title: `${project.title} | Aarav Jhawar`,
    description: project.description,
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();
  return <CaseStudyClient project={project} />;
}
