import React, { useState, useEffect } from "react";
import { BounceLoader } from 'react-spinners';
import axios from "axios";

function NoteContainer() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  function fetchNotes() {
    setLoading(true);
    axios
      .get("https://keepernote-server.onrender.com/data")
      .then((response) => {
        setNotes(response.data.notes);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
        setLoading(false);
        setError("Failed to fetch notes");
      });
  }

  function addNote() {
    const newNote = {
      title: title,
      description: description,
    };

    axios
      .post("https://keepernote-server.onrender.com/data", newNote)
      .then((response) => {
        console.log("Note added:", response.data);
        fetchNotes(); // Refresh the notes after adding a new note
      })
      .catch((error) => {
        console.error("Error adding note:", error);
      });

    setTitle("");
    setDescription("");
  }

  function deleteNote(noteId) {
    axios
      .delete(`https://keepernote-server.onrender.com/data/${noteId}`)
      .then((response) => {
        console.log("Note deleted successfully");
        fetchNotes(); // Refresh the notes after deleting a note
      })
      .catch((error) => {
        console.error("Error deleting note:", error);
      });
  }

  return (
    <div>
      <div className="note-input">
        <input
          className="title"
          type="text"
          placeholder="Enter title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="description"
          type="text"
          placeholder="Enter description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={addNote}>Add</button>
      </div>

      {loading ? (
        <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(255, 255, 255, 0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
        }}
        >
          <BounceLoader color="#f5ba13" cssOverride={{}} size={500} />
        </div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div>
          {notes.map((note) => (
            <div className="note" key={note._id}>
              <h3>{note.title}</h3>
              <p>{note.description}</p>
              <button onClick={() => deleteNote(note._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NoteContainer;
