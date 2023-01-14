import NewNote, { links as newLinks } from "~/components/NewNote";

export const links = () => {
  return [...newLinks()];
};

export default function NotesPage() {
  return (
    <main>
      <NewNote />
    </main>
  );
}
