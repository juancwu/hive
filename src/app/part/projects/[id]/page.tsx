export default async function PartProjectsPage({ params }: { params: { id: string } }) {
  return (
    <div>
      Show which projects are related to the part with id: <p>{params.id}</p>
    </div>
  );
}
