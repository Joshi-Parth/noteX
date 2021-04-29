import React, { useState,useEffect} from 'react'
import './Note.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchive } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router-dom'


function Note() {
    
    const location = useLocation();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [updatedAt, setUpdatedAt] = useState(0);
    const [archive, setArchive] = useState(false);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    
    useEffect(() => {
        if(location.note) {
            setTitle(location.note.title);
            setDescription(location.note.description);
            setUpdatedAt(location.note.updatedAt);
            setArchive(location.note.archive);
        }
    }, [location.note])


    return ( 
        <div className="note">
            <div className="note-header">
                <div className="note-header-date">
                    Last edited on {updatedAt}
                </div>
                <div className="note-header-action-btn">
                    <div className="action-btn">
                        <FontAwesomeIcon icon={faArchive} />
                    </div>
                </div>
            </div>
            <div className="note-body">
                <div className="note-body-head">
                    <input value={title} placeholder="Title" onChange={handleTitleChange}  />
                </div>
                <div className="note-body-content">
                    <textarea value={description} placeholder='Start Writing' onChange={handleDescriptionChange} />
                </div>
            </div>
        </div>
    )
}

export default Note
