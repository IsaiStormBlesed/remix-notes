import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import NewNote, { links as newLinks } from "~/components/NewNote";
import NoteList, { links as noteListLinks } from "~/components/NoteList";
import { getStoredNotes, storeNotes } from "~/data/notes";

export const links = () => {
  return [...newLinks(), ...noteListLinks()];
};

export async function action({ request }) {
  const formData = await request.formData();
  const newNote = Object.fromEntries(formData);

  // Add validation
  if (newNote.title.trim().length < 5) {
    return { msg: "Invalid title - must be at least 5 chars long" };
  }

  const existingNotes = await getStoredNotes();
  newNote.id = new Date().toISOString();
  const updatedNotes = existingNotes.concat(newNote);
  await storeNotes(updatedNotes);
  return redirect("/notes");
}

export async function loader() {
  const notes = await getStoredNotes();
  return notes;
}

export default function NotesPage() {
  const notes = useLoaderData();

  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}
