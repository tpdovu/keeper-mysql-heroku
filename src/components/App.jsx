import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    Axios.get("https://keeper-mysql-dovu.herokuapp.com/api/get").then(
      (response) => {
        setNotes(response.data);
      }
    );
  }, [notes]);

  function addNote(newNote) {
    Axios.post("https://keeper-mysql-dovu.herokuapp.com/api/insert", {
      title: newNote.title,
      content: newNote.content,
    });

    setNotes([
      ...notes,
      {
        title: newNote.title,
        content: newNote.content,
      },
    ]);
  }

  function deleteNote(note) {
    Axios.delete(
      `https://keeper-mysql-dovu.herokuapp.com/api/delete/${note.id}`
    );
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((note, id) => {
        return (
          <Note
            key={id}
            id={note.id}
            title={note.title}
            content={note.content}
            onDelete={() => {
              deleteNote(note);
            }}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
