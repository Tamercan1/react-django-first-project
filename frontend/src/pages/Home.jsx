import api from "../api";
import { useEffect, useState } from "react";
import Note from "../components/Note";
import "../styles/Home.css";

function Home() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    
    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api.get("/api/notes/")
        .then((res) => res.data)
        .then((data) => { setNotes(data); console.log(data); })
        .catch((error) => alert(error))
    }

    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}/`)
        .then((res) => {
            if(res.status === 204) {
                alert("Note deleted.");
                getNotes();
            }
            else {
                alert("Failed to delete note");
            }      
        })
        .catch((error) => alert(error))
    }

    const createNote = (event) => {
        event.preventDefault();
        api.post("/api/notes/", { title, content })
        .then((res) => {
            if(res.status === 201) {
                alert("Note created");
                getNotes();
                setTitle("");
                setContent("");
            }
            else {
                alert("Failed to create note");
            }
        })
        .catch((error) => alert(error))
    }

    return(
        <div>
            <div>
                <h2>Notes: </h2>
                {notes.map((note) => {
                    return <Note note={note} onDelete={deleteNote} key={note.id}/>
                })}

            </div>
            <h2>Create Note</h2>
            <form onSubmit={createNote}>
                <label htmlFor="title">Title:</label>
                <br />
                <input 
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                <label htmlFor="content">Content:</label>
                <br />
                <textarea 
                    name="content" 
                    id="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Home