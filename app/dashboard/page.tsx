import PageWrapper from "@/components/page-wrapper";
import { getNotebooks } from "@/server/notebooks";
import { CreateNotebookBtn } from "@/components/create-notebook-btn";

export default async function Page() {
  const notebooks = await getNotebooks();
  return (
    <PageWrapper breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }]}>
      <h1>Notebooks</h1>
      <CreateNotebookBtn />
      
      {notebooks.success && 
        notebooks?.notebooksByUser?.map((notebook) => (
          <div key={notebook.id}>{notebook.name}</div>
        ))
      }

      {notebooks.success && notebooks?.notebooksByUser?.length === 0 && (
        <div>No notebooks found</div>
      )}
    </PageWrapper>
  );
}
