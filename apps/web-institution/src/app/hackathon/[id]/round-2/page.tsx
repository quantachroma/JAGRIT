import Round2Client from "./round-2-client";

export default function Round2Page({ params }: { params: { id: string } }) {
  return <Round2Client ticketId={params.id} />;
}

