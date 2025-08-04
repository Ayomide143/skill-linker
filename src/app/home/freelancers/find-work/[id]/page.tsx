import { notFound } from "next/navigation";
import JobDetailsClient from "@/components/JobDetails";
async function getJob(id: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/helpers/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function JobDetailsPage({ params }: { params: { id: string } }) {
  const job = await getJob(params.id);
  if (!job) return notFound();

  return <JobDetailsClient job={job} />;
}
