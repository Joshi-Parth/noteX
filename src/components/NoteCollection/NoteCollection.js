import React, { useState,useEffect } from 'react'
import './NoteCollection.scss'
import db from '../../firebase'

function NoteCollection(props) {
    const {title} = props;
    return (
        <div className="notecollection">
            
            <div className="notecollection-header">
                <div className="notecollection-title">
                    <h1>{title}</h1>
                </div>
                <div className="notecollection-subtitle">
                    <div className="notecollection-count">
                        Notes 
                    </div>
                </div>
            </div>
            
            <div className="notecollection-body">
                
                        <div className="note-card">
                    
                            <div className="note-card-head">
                                <div className="note-card-title">
                                    Untitled
                                </div>
                                <div className="note-card-desc">
                                    Description
                                </div>
                            </div>
                            <div className="note-card-date">
                                24th April 2021
                            </div>
                            
                        </div>
                    
                   
                
                <div className="note-card">
                    <div className="note-card-head">
                        <div className="note-card-title">
                            Note One 
                        </div>
                        <div className="note-card-desc">
                            Some description
                        </div>
                    </div>
                    <div className="note-card-date">
                        24th April 2021
                    </div>
                    
                </div>
                <div className="note-card">
                    <div className="note-card-head">
                        <div className="note-card-title">
                            Note One 
                        </div>
                        <div className="note-card-desc">
                            Some description
                        </div>
                    </div>
                    <div className="note-card-date">
                        24th April 2021
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default NoteCollection
