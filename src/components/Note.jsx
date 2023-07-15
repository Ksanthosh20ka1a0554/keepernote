import React from "react";

function Note(props) {
  function handleDelete() {
    fetch(`http://localhost:7000/data/${props.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Note deleted successfully");
        props.onDelete();
      })
      .catch((error) => {
        console.error("Error deleting note:", error);
      });
  }

  return (
    <div className="note" key={props.id}>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}


export default Note;
