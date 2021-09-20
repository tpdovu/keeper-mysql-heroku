import React, { useState, useEffect } from "react";

import Note from "./Note";
import CreateArea from "./CreateArea";
import Axios from "axios";

import EditNote from "./EditNote";
//API server URL: https://keeper-mysql-dovu.herokuapp.com/

function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [editVisible, setEditVisible] = useState(false);
  const [numPinned, setNumPinned] = useState(0);
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
      "https://keeper-mysql-dovu.herokuapp.com/api/get"
    );
    const retrievedNotes = response.data;
    setNotes(retrievedNotes);

    let count = retrievedNotes.filter(
      (note) => note.isPinned === 1 || note.isPinned === true
    ).length;
    setNumPinned(count);
  };

  function addNote(newNote) {
    Axios.post("https://keeper-mysql-dovu.herokuapp.com/api/insert", {
      title: newNote.title,
      content: newNote.content,
      isPinned: false,
    });

    setNotes([
      ...notes,
      {
        title: newNote.title,
        content: newNote.content,
        isPinned: false,
      },
    ]);
  }

  function deleteNote(note) {
    Axios.delete(
      `https://keeper-mysql-dovu.herokuapp.com/api/delete/${note.id}`
    );
    const del = notes.filter((currentNote) => currentNote.id !== note.id);
    setNotes(del);
  }

  function editNote(e) {
    setCurrentNote(e);
    setEditVisible(true);
  }

  function updateNote(e) {
    setEditVisible(false);

    Axios.put(
      `https://keeper-mysql-dovu.herokuapp.com/api/update/${currentNote.id}`,
      {
        title: e.title,
        content: e.content,
        isPinned: e.isPinned,
      }
    );

    // const newNote = {
    //   id: currentNote.id,
    //   title: e.title,
    //   content: e.content,
    //   isPinned: e.isPinned,
    // };
    // const copyNotes = notes;
    // copyNotes[notes.findIndex((note) => note.id === currentNote.id)] = newNote;
    // setNotes(copyNotes);

    const noteIndex = notes.findIndex((note) => note.id === currentNote.id);

    notes[noteIndex].title = e.title;
    notes[noteIndex].content = e.content;
  }

  function togglePin(note) {
    Axios.put(
      `https://keeper-mysql-dovu.herokuapp.com/api/togglePin/${note.id}`
    );
    const noteIndex = notes.findIndex(
      (currentNote) => currentNote.id === note.id
    );
    notes[noteIndex].isPinned = !notes[noteIndex].isPinned;
    if (notes[noteIndex].isPinned === true || notes[noteIndex.isPinned === 1]) {
      setNumPinned(numPinned + 1);
    } else {
      setNumPinned(numPinned - 1);
    }
  }

  const getPinnedNotes = () => {
    return notes.filter(
      (note) => note.isPinned === true || note.isPinned === 1
    );
  };

  return (
    <div className="container">
      <h2>Notes</h2>
      <p>Create, read update and delete notes here!</p>
      <CreateArea onAdd={addNote} />
      {/* pinned notes here - dynamic pinned/unpinned headers not working */}
      {/* {numPinned !== 0 ? <h3>Pinned</h3> : null} */}
      {notes.length !== 0 ? <h3>Pinned</h3> : null}
      {getPinnedNotes().map((note, index) => {
        return (
          <Note
            key={index}
            id={note.id}
            title={note.title}
            content={note.content}
            isPinned={note.isPinned}
            onDelete={() => {
              deleteNote(note);
            }}
            editNote={() => {
              editNote(note);
            }}
            setPinned={(e) => {
              togglePin(note);
            }}
          />
        );
      })}
      {/* unpinned note here */}
      {/* {numPinned !== 0 && notes.length !== numPinned ? <h3>Unpinned</h3> : null} */}
      {notes.length !== 0 ? <h3>Unpinned</h3> : null}
      {notes
        .filter((note) => note.isPinned === false || note.isPinned === 0)
        .map((note, index) => {
          return (
            <Note
              key={index}
              id={note.id}
              title={note.title}
              content={note.content}
              isPinned={note.isPinned}
              onDelete={() => {
                deleteNote(note);
              }}
              editNote={() => {
                editNote(note);
              }}
              setPinned={(e) => {
                togglePin(note);
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
