import React, { useState,useEffect, useContext } from 'react'
import './NoteCollection.scss'
import { useHistory, useRouteMatch  } from 'react-router';
import { NotesContext } from '../../context/context'
import firebase from '../../firebase'
import {NavLink, useParams} from 'react-router-dom'
import {collectionFormatDate} from '../../utils/helpers'
import Note from '../Note/Note';


const notesRef = firebase.collection('notes').orderBy("updatedAt", "desc");

function NoteCollection(props) {
    const {title} = props;
    const param = useParams();
    const [error, setError] = useState(null);
    const notesContext = useContext(NotesContext);
    const match = useRouteMatch();
    const history = useHistory();

    useEffect(() => {
        let getAllNotes = notesRef.where("archive", "==" , match.url === '/all-notes' ? false : true )
            .onSnapshot((snapshot) => {
            let response = [];
            snapshot.docs.forEach((doc) => (
            response.push({
            id: doc.id,
            ...doc.data(),
            })));

            if(response.error){
                setError(response.error);
                return false;
            }

            

            notesContext.dispatch({type: 'getAllNotesSuccess', payload: response});
            if(response.length > 0){
                
                history.push({
                    pathname: `${match.url}/${response[0].id}`,
                    note: response[0]
                })
            }
        });
        return () => getAllNotes();
    },[match.url])
    
    
    
    
        
        
        

    
    
    
    

    
    return (
        <div className="notecollection">
            <div className="notecollection-header">
                <div className="notecollection-title">
                    <h1>{title}</h1>
                </div>
                <div className="notecollection-subtitle">
                    <div className="notecollection-count">
                        {notesContext.notesState.length} Notes 
                    </div>
                </div>
            </div>
            
            <div className="notecollection-body">
                {
                    notesContext.notesState.length > 0 ? notesContext.notesState.map((note) => (
                        <NavLink key={note.id} className="note-card" to={
                        
                            {
                                pathname: `${match.url}/${note.id}`,
                                note
                            }
                        }>
                    
                            <div className="note-card-head">
                                <div className="note-card-title">
                                    {note.title}
                                </div>
                                <div className="note-card-desc">
                                    {note.description}
                                </div>
                            </div>
                            <div className="note-card-date">
                                {collectionFormatDate(note.updatedAt)}
                            </div>
                            
                        </NavLink>
                    )) : <div className="empty-state">No note found </div>
                }
                        
                    
                   
                
                
            </div>
        </div>
    )
}

export default NoteCollection
