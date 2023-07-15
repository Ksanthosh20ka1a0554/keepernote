import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import NoteInput from "./Noteinput";
import Login from "./Login";

function App() {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  function fetchNotes() {
    fetch("http://localhost:7000/data")
      .then((response) => response.json())
      .then((data) => {
        setNotes(data.notes);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
        setError("Failed to fetch notes");
      });
  }

  function addNoteToState(newNote) {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  }

  function handleNoteDelete(noteId) {
    fetch(`http://localhost:7000/data/${noteId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Note deleted successfully");
        fetchNotes(); // Refresh the notes after deletion
      })
      .catch((error) => {
        console.error("Error deleting note:", error);
      });
  }

  return (
    <div>
      <Header />
      <NoteInput addNoteToState={addNoteToState} fetchNotes={fetchNotes} />
      {error ? (
        <p>{error}</p>
      ) : (
        notes.map((note) => (
          <Note
            key={note._id}
            id={note._id}
            title={note.title}
            content={note.description}
            onDelete={() => handleNoteDelete(note._id)}
          />
        ))
      )}
      <Login/>
      <Footer />
    </div>
  );
}

export default App;
