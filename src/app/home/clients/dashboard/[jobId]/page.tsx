import { use } from "react";
import JobApplicationsPage from "@/components/JobApplicantPage"; 

export default function Page({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = use(params); // to unwrap the promise

  return <JobApplicationsPage jobId={jobId} />;
}
