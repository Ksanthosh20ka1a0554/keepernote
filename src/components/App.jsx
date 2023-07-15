import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import NoteInput from "./Noteinput";
import Login from "./Login";
import RotatingLines from "react-loader-spinner";


function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  function fetchNotes() {
    setLoading(true);
    fetch("https://keepernote-server.onrender.com/data")
      .then((response) => response.json())
      .then((data) => {
        setNotes(data.notes);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
        setLoading(false);
        setError("Failed to fetch notes");
      });
  }

  function addNoteToState(newNote) {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  }

  function handleNoteDelete(noteId) {
    fetch(`https://keepernote-server.onrender.com/data/${noteId}`, {
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
      {loading ? (
        <div className="spinner-container">
      <div className="loading-spinner">
      </div>
    </div>
      ) : error ? (
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
      {/* <Login /> */}
      <Footer />
    </div>
  );
}

export default App;
