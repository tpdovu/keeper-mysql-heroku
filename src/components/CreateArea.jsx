import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const [textClick, setTextClick] = useState(false);

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

  function handleTextClick(event) {
    setTextClick(true);
  }

  function submitNote(event) {
    event.preventDefault();
    props.onAdd(note);
    setNote({
      title: "",
      content: "",
    });
  }

  return (
    <div>
      <form className="create-note">
        {textClick ? (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            autoComplete="off"
            placeholder="Title"
          />
        ) : null}

        <textarea
          autoComplete="off"
          onChange={handleChange}
          value={note.content}
          name="content"
          placeholder="Take a note..."
          rows={textClick ? 3 : 1}
          onClick={handleTextClick}
        />
        <Zoom in={textClick}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
