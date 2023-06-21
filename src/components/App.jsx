import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import notes from "../notes";

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