import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { ickeeper_backend } from "../../../declarations/ickeeper_backend";

function App() {
    const [notes, setNotes] = useState([])

    function addNote(newNote) {
        setNotes(newNote => {
            ickeeper_backend.createNote(newNote.title, newNote.content)
            return [newNote, ...prevNotes]
        });
    }

    useEffect(() => {
        fetchData();
    }, []);
    
    async function fetchData() {
        const notesArray = ickeeper_backend.readNotes();
        setNotes(notesArray)
    }

    function deleteNote(id){
        ickeeper_backend.removeNote(id)
        setNotes(prevNotes => {
            return prevNotes.filter((noteItem, index) => {
                return index !== id
            });
        });
    }

    return (
        <div>
            <Header />
            <CreateArea onAdd={addNote} />
            {notes.map((noteItem, index) => {
                return (
                    <Note
                        key={index}
                        id={index}
                        title={noteItem.title}
                        content={noteItem.content}
                        onDelete={deleteNote}
                    />
                );
            })};
            <Footer />
        </div>
    );
}

export default App;