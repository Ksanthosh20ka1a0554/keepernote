import React, { useState } from "react";
import notes from "../notes";
import Note from "./Note";

function NoteInput() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [noteList, setNoteList] = useState(notes);

  function addItem() {
    const newNote = {
      key: Date.now(),
      title: title,
      content: content,
    };

    setNoteList((prevNoteList) => [...prevNoteList, newNote]);

    setTitle("");
    setContent("");
  }

  function handleDelete(key) {
    setNoteList((prevNoteList) => prevNoteList.filter((note) => note.key !== key));
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
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></input>
          <button onClick={addItem}>Add</button>
        </div>
      </div>
     
    
  );
}

export default NoteInput;
