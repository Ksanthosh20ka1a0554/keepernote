import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import NoteInput from "./Noteinput";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  function fetchNotes() {
    fetch("http://localhost:8000/data")
      .then((response) => response.json())
      .then((data) => {
        setNotes(data.notes);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  }

  function addNoteToState(newNote) {
    setNotes((prevNotes) => [...prevNotes, newNote]);
    window.location.reload(); // Refresh the page
  }

  return (
    <div>
      <Header />
      <NoteInput addNoteToState={addNoteToState} fetchNotes={fetchNotes} />
      {notes.map((note) => (
        <Note
          key={note._id}
          title={note.title}
          content={note.description}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
