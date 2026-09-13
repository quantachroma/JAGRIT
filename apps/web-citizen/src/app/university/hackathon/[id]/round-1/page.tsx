import Round1Client from "./round-1-client";

export default function Round1Page({ params }: { params: { id: string } }) {
  return <Round1Client ticketId={params.id} />;
}

