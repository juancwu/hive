export default async function PartDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div>
      Show details related to the part with id: <p>{params.id}</p>
    </div>
  );
}
