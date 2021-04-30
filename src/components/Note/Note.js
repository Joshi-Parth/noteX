import React, { useState,useEffect, useContext} from 'react'
import './Note.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchive, faBackward, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useLocation, useParams, useHistory} from 'react-router-dom'
import firebase from '../../firebase'
import { NotesContext } from '../../context/context'
import { noteFormatDate } from '../../utils/helpers'

const notesRef = firebase.collection('notes');


function Note() {
    
    const location = useLocation();
    const history = useHistory();
    const params = useParams();
    const notesContext = useContext(NotesContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [updatedAt, setUpdatedAt] = useState(0);
    const [archive, setArchive] = useState(false);
    const [error, setError] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const handleUpdateNote = (key) => {
        
        if(key == 'title') {
            notesRef.doc(params.id).update({
                title: title,
                updatedAt: Date.now()
            }).then(() => {
                return;
            })
            .catch((err) => {
                setError(err);
                return false;
            })
        } else if(key == 'description'){
            notesRef.doc(params.id).update({
                description: description,
                updatedAt: Date.now()
            }).then((res) => {
                return;
            })
            .catch((err) => {
                setError(err);
                return false;
            })
        }
        
        notesContext.dispatch({ type: 'updatedNoteSuccess', payload: location.note, id: params.id });
    }

    const handleArchiveNote = async() => {
        notesRef.doc(params.id).update({
            archive: !archive,
            updatedAt: Date.now()
        }).then(() => {
            return;
        })
        .catch((err) => {
            setError(err);
            return false;
        })
        resetState();
        history.push('/all-notes');
        

    }

    const resetState = () => {
        setTitle('');
        setDescription('');
        setUpdatedAt('');
        setArchive(false);
        setError(null);
    }


    const handleUnArchive = async () => {
        notesRef.doc(params.id).update({
            archive: !archive,
        }).then(() => {
            return;
        })
        .catch((err) => {
            setError(err);
            return false;
        })
        resetState();
        history.push('/trash');
    }

    const handleDeleteNote = () => {
        notesRef.doc(params.id).delete()
        .then(() => {
            return;
        })
        .catch((err) => {
            setError(err);
            return false;
        })
        resetState();
        history.push('/trash');
    }
    
    useEffect(() => {
        if(location.note) {
            setTitle(location.note.title);
            setDescription(location.note.description);
            setUpdatedAt(location.note.updatedAt);
            setArchive(location.note.archive);
        }
    }, [location.note])

    useEffect(() => {
        if (notesContext.notesState.length > 0) {
            const [selectednote] = notesContext.notesState.filter((e) => e.id === params.id);
            if (selectednote) {
                setTitle(selectednote.title)
                setDescription(selectednote.description)
                setUpdatedAt(selectednote.updatedAt)
                setArchive(selectednote.archive)
            }
        }
    }, [notesContext.notesState])


    return ( 
        <div className="note">
            <div className="note-header">
                <div className="note-header-date">
                    Last edited on {noteFormatDate(updatedAt)}
                </div>
                <div className="note-header-action-btn">
                    { !archive  ?   <div className="action-btn" onClick={handleArchiveNote}>
                                        <FontAwesomeIcon icon={faArchive} />
                                    </div> 
                                :   <>
                                    <div className="action-btn" onClick={handleUnArchive}>
                                        <FontAwesomeIcon icon={faBackward} />
                                    </div>
                                    <div className="action-btn" onClick={handleDeleteNote}>
                                        <FontAwesomeIcon icon={faTrash}  />
                                    </div>
                                    </>
                    }
                    
                    
                </div>
            </div>
            <div className="note-body">
                <div className="note-body-head">
                    <input value={title} placeholder="Title" onChange={handleTitleChange} onBlur={() => handleUpdateNote('title')} />
                </div>
                <div className="note-body-content">
                    <textarea value={description} placeholder='Start Writing' onChange={handleDescriptionChange} onBlur={() => handleUpdateNote('description')}/>
                </div>
            </div>
        </div>
    )
}

export default Note
