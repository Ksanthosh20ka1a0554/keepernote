import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import notes from "../notes";
import NoteInput from "./Noteinput";

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://santhosh9515:Santhosh9515@cluster0.itdx0o5.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
  } finally {
    
    await client.close();
  }
}
run().catch(console.dir);



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