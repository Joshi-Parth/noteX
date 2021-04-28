import React from 'react'
import './Note.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchive } from '@fortawesome/free-solid-svg-icons'


function Note() {
    return ( 
        <div className="note">
            <div className="note-header">
                <div className="note-header-date">
                    Last edited on Sep 11, 2021
                </div>
                <div className="note-header-action-btn">
                    <div className="action-btn">
                        <FontAwesomeIcon icon={faArchive} />
                    </div>
                </div>
            </div>
            <div className="note-body">
                <div className="note-body-head">
                    <input placeholder="Title" />
                </div>
                <div className="note-body-content">
                    <textarea placeholder='Start Writing' />
                </div>
            </div>
        </div>
    )
}

export default Note
