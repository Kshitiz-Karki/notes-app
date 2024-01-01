import './css/style.css'
import Split from 'react-split'
import Sidebar from './components/Sidebar'
import Editor from './components/Editor'
import Preview from './components/Preview'
import { useState, useEffect } from 'react'
import { nanoid } from "nanoid"
import data from './data'

function App() {

  const [notes, setNotes] = useState(
    () => JSON.parse(localStorage.getItem('notes')) || data
  )
  
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  const [selectedNoteId, setSelectedNoteId] = useState(
    notes[0]?.id || ''
  )

  const createNewNote = () => {
    const newNote = {
      id: nanoid(),
      title: "Note's title ...",
      body: "# Type note's content here"
    }
    setNotes( prevNotes => [newNote].concat(prevNotes))
    setSelectedNoteId(newNote.id)
  }

  const findCurrentNote = () => notes.find(note => note.id === selectedNoteId) || notes[0]

  const deleteNote = (event, id) => {
    event.stopPropagation()
    if(confirm('Delete note?')){
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id))
    }
  }

  const updateNote = (event) => {
    const currentNote = findCurrentNote()
    const updatedNote = {
      ...currentNote,
      [event.target.name]: event.target.value
    }
    setNotes(prevNotes => [updatedNote].concat(prevNotes.filter(note => note.id !== selectedNoteId)) )
  }

  return (
    <Split
      sizes={[20, 40, 40]}
      direction='horizontal'
      className='split'
      gutterSize={5}
      minSize={[180, 0, 0]}
    >
      <Sidebar 
        notes={notes}
        currentNote={findCurrentNote()}
        setSelectedNoteId={setSelectedNoteId}
        deleteNote={deleteNote}
        createNewNote={createNewNote}
      />
      <Editor
        currentNote={findCurrentNote()}
        updateNote={updateNote}
        notes={notes}
      />
      <Preview
        currentNote={findCurrentNote()}
      />
    </Split>
  )
}

export default App
