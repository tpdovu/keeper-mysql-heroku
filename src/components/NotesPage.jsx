import React, { useState, useEffect } from "react";

import Note from "./Note";
import CreateArea from "./CreateArea";
import Axios from "axios";

import EditNote from "./EditNote";

function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [editVisible, setEditVisible] = useState(false);
  const [currentNote, setCurrentNote] = useState({
    id: "",
    title: "",
    content: "",
  });

  useEffect(() => {
    getData();
    setEditVisible(false);
  }, []);

  const getData = async () => {
    const response = await Axios.get(
      "https://trusting-visvesvaraya-317150.netlify.app/api/get"
    );
    setNotes(response.data);
  };

  function addNote(newNote) {
    Axios.post("https://trusting-visvesvaraya-317150.netlify.app/insert", {
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
    Axios.delete(`https://trusting-visvesvaraya-317150.netlify.app/${note.id}`);
    const del = notes.filter((currentNote) => currentNote.id !== note.id);
    setNotes(del);
  }

  function editNote(e) {
    setCurrentNote(e);
    setEditVisible(true);
  }

  function updateNote(e) {
    Axios.put(
      `https://trusting-visvesvaraya-317150.netlify.app/${currentNote.id}`,
      {
        title: e.title,
        content: e.content,
      }
    );

    const newNote = {
      id: currentNote.id,
      title: e.title,
      content: e.content,
    };
    const copyNotes = notes;
    copyNotes[notes.findIndex((note) => note.id === currentNote.id)] = newNote;
    setNotes(copyNotes);
    setEditVisible(false);
  }
  return (
    <div className="container">
      <h2>Notes</h2>
      <p>Create, read update and delete notes here!</p>
      <CreateArea onAdd={addNote} />
      {notes.map((note, index) => {
        return (
          <Note
            key={index}
            id={note.id}
            title={note.title}
            content={note.content}
            onDelete={() => {
              deleteNote(note);
            }}
            editNote={() => {
              editNote(note);
            }}
          />
        );
      })}
      {editVisible ? (
        <EditNote
          title={currentNote.title}
          content={currentNote.content}
          onEdit={(note) => {
            updateNote(note);
          }}
          onCloseEditor={() => {
            setEditVisible(false);
          }}
        />
      ) : null}
    </div>
  );
}

export default NotesPage;
