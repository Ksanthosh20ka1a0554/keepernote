import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import notes from "../notes";
import NoteInput from "./Noteinput";
import run from "../db"

run().catch(console.error());

function createNote(notes){
    return(
        <Note
            key={notes.key}
            title={notes.title}
            content={notes.content}
        />
    );
}

function App(){
    return(
        <div>
            <Header/>
            <NoteInput/>
            {/*notes.map(createNote)*/}
            {notes.map(noteItem => 
                <Note
                    key={noteItem.key}
                    title={noteItem.title}
                    content={noteItem.content}
                />)
        }  
            <Footer/>
        </div>
    );
}

export default App;