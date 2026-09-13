import Round3Client from "./round-3-client";

export default function Round3Page({ params }: { params: { id: string } }) {
  return <Round3Client ticketId={params.id} />;
}

