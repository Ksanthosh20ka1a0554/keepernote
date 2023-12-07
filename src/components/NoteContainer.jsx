import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NoteContainer() {
  const { email } = useParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    fetchNotes(email);
  }, [email]);

  function fetchNotes(email) {
    setLoading(true);
    axios
      .get(`http://localhost:7000/notes/${email}`)
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
      userId: email, // Pass the email as the user ID
    };

    axios
      .post(`http://localhost:7000/notes/${email}`, newNote)
      .then((response) => {
        console.log("Note added:", response.data);
        fetchNotes(email); // Refresh the notes after adding a new note
      })
      .catch((error) => {
        console.error("Error adding note:", error);
      });

    setTitle("");
    setDescription("");
  }

  function deleteNote(noteId) {
    axios
      .delete(`http://localhost:7000/notes/${noteId}`)
      .then((response) => {
        console.log("Note deleted successfully");
        fetchNotes(email); // Refresh the notes after deleting a note
      })
      .catch((error) => {
        console.error("Error deleting note:", error);
      });
  }
  function handleLogout() {
    // Perform logout action
    // ...

    navigate("/login"); // Redirect to the login page after logout
  }

  return (
    <div>
    <div className="top">
    <h1>Welcome, {email}!</h1>
    <button className="log-out" onClick={handleLogout}>Logout</button>
    </div>
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
        <div>Loading notes...</div>
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
