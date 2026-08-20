import PageWrapper from "@/components/page-wrapper";
import { getNoteById } from "@/server/notes";

type Params = Promise<{ noteId: string }>;

export default async function NotePage({ params }: { params: Params }) {
  const { noteId } = await params;

  const { note } = await getNoteById(noteId);

  if (!note) {
      return (
        <PageWrapper
          breadcrumbs={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Note not found", href: "/dashboard" },
          ]}
        >
          <h1>Note not found</h1>
        </PageWrapper>
      );
    }

  return (
    <PageWrapper
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: note.title, href: `/dashboard/note/${noteId}` },
      ]}
    >
      <text>{note.title}</text>
      <text>{note.content}</text>
    </PageWrapper>
  );
}
