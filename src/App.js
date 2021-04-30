import './App.css';
import SideNavBar from './components/SideNavBar/SideNavBar'
import NoteCollection from './components/NoteCollection/NoteCollection'
import Note from './components/Note/Note'
import {NotesContext} from './context/context'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {  useReducer, useState } from 'react';

const initialState = [];

const NoteReducer = (state, action) => {
  let draftNotes = [...state];
  switch(action.type){
    case 'getAllNotesSuccess':
      return action.payload; 
    case 'updatedNoteSuccess':
      let index = state.findIndex(item => item.id === action.id);
      draftNotes[index] = { ...draftNotes[index], ...action.payload };
      return draftNotes;
    case 'archiveNoteSuccess':
      return draftNotes.filter((item) => item.id !== action.id);
    default:
      return state;
    
  }
}



function App() {

  const [notes, dispatch] = useReducer(NoteReducer, initialState);



  return (
    <Router>
      <NotesContext.Provider value={{notesState: notes, dispatch }}>
        <div className="App">
          <SideNavBar />
          <Switch>
            <Route path="/all-notes">
              <NoteCollection title="All-Notes" />
              <Route path="/all-notes/:id">
                <Note />  
              </Route>
            </Route>
            <Route path="/trash">
              <NoteCollection title="Trash" />
                <Route path="/trash/:id">
                  <Note />
                </Route>
            </Route>
          </Switch>
        </div>
      </NotesContext.Provider>
    </Router>
  );
}

export default App;
