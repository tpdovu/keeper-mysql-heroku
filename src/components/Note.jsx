import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

function Note(props) {
  const [style, setStyle] = useState({ visibility: "hidden" });

  //button hover/styling
  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));
  const classes = useStyles();

  return (
    <div
      className="note"
      onMouseEnter={(event) => {
        setStyle({ visibility: "visible" });
      }}
      onMouseLeave={(event) => {
        setStyle({ visibility: "hidden" });
      }}
    >
      <h1>{props.title}</h1>
      <p>{props.content}</p>

      <IconButton
        aria-label="delete"
        // className={classes.margin}
        onClick={() => {
          props.onDelete();
        }}
        style={style}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>

      <div class="pin-button">
        {/* <IconButton>
          <button
            class="fa-lg fas fa-thumbtack pin-button"
            // style={style}
          ></button>
        </IconButton> */}
      </div>
    </div>
  );
}

export default Note;
