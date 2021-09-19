import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import DeleteIcon from "@material-ui/icons/Delete";

function EditNote(props) {
  const [note, setNote] = useState({
    id: props.id,
    title: props.title,
    content: props.content,
  });

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function updateNote(event) {
    event.preventDefault();
    props.onEdit(note);
  }

  function hideNoteEdit(event) {
    event.preventDefault();
    props.onCloseEditor();
  }

  return (
    <div className="edit-note-div">
      <form className="edit-note">
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          autoComplete="off"
          placeholder="Title"
        />

        <textarea
          autoComplete="off"
          onChange={handleChange}
          value={note.content}
          name="content"
          placeholder="Take a note..."
          rows="5"
        />
        <button className="close-btn" onClick={hideNoteEdit}>
          Cancel
        </button>
        <button className="update-btn" onClick={updateNote}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditNote;
