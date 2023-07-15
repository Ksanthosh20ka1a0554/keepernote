import React, { useState } from "react";

function NoteInput({ addNoteToState }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function addItem() {
    const newNote = {
      title: title,
      description: description
    };

    fetch("http://localhost:7000/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Note added:", data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error adding note:", error);
      });

    setTitle("");
    setDescription("");
  }

  return (
    <div className="note-container">
      <div className="note-input">
        <input
          id="notetitle"
          className="title"
          type="text"
          placeholder="Enter title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <input
          id="notedes"
          className="des"
          type="text"
          placeholder="Enter Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <button onClick={addItem}>Add</button>
      </div>
    </div>
  );
}

export default NoteInput;
