import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Axios from "axios";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./About";
import Welcome from "./Welcome";
import EditNote from "./EditNote";
import NotesPage from "./NotesPage";

function App() {
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
      "https://keeper-mysql-dovu.herokuapp.com/api/get"
    );
    setNotes(response.data);
  };

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

    const del = notes.filter((currentNote) => currentNote.id !== note.id);
    setNotes(del);
  }

  function editNote(e) {
    setCurrentNote(e);
    setEditVisible(true);
  }

  function updateNote(e) {
    Axios.put(
      `https://keeper-mysql-dovu.herokuapp.com/api/update/${currentNote.id}`,
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
    <div className="application">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Welcome}></Route>
          <Route path="/about" exact component={About}></Route>
          <Route path="/notes" exact component={NotesPage}></Route>
        </Switch>
      </Router>
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

      <Footer />
    </div>
  );
}

export default App;
