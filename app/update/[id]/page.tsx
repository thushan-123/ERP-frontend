import { Suspense } from "react";
import UpdateUom from "./UpdateUom";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function Page({ params }: PageProps) {
  return (
    <Suspense fallback={<p>Loading update form...</p>}>
      <UpdatePage params={params} />
    </Suspense>
  );
}

async function UpdatePage({ params }: PageProps) {
  const { id } = await params;

  return <UpdateUom id={id} />;
}
