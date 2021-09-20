import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import RoomIcon from "@material-ui/icons/Room";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";

function Note(props) {
  const [style, setStyle] = useState({ visibility: "hidden" });
  const [pinned, setPinned] = useState(props.isPinned);

  return (
    <div
      className="note"
      onMouseEnter={(event) => {
        setStyle({ visibility: "visible" });
      }}
      onMouseLeave={(event) => {
        setStyle({ visibility: "hidden" });
      }}
      onClick={() => {
        props.editNote();
      }}
    >
      <IconButton
        aria-label="pin button"
        className="pin-button"
        onClick={(e) => {
          e.stopPropagation();
          setPinned(!pinned);
          props.setPinned();
        }}
        style={!pinned ? style : null}
      >
        {!pinned ? (
          <RoomOutlinedIcon fontSize="medium" />
        ) : (
          <RoomIcon fontSize="medium" />
        )}
      </IconButton>
      <h1 className="title">{props.title}</h1>

      <p className="content">{props.content}</p>

      <IconButton
        aria-label="delete"
        // className={classes.margin} - default code for iconbutton
        onClick={(e) => {
          e.stopPropagation();
          props.onDelete();
        }}
        style={style}
        className="delete-button"
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </div>
  );
}

export default Note;
