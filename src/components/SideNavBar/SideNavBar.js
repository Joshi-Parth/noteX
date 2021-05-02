import React, {useContext, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faSearch, faPlus, faStar, faTrash, faStickyNote, faInfo, faClock, faList} from '@fortawesome/free-solid-svg-icons'
import './SideNavBar.scss'
import { NavLink , useHistory} from 'react-router-dom'
import DataService from '../../utils/apiRequests'
import { NotesContext } from '../../context/context'
import firebase from '../../firebase'

const notesRef = firebase.collection('notes');

function SideNavBar() {
    const notesContext = useContext(NotesContext);
    const history = useHistory();
    const [error, setError] = useState(null);
    
    
    
    const handleCreateNote = () => {

        let response = {
            title: "Untitled",
            description: "",
            createdAt: Date.now(),
            updatedAt: Date.now(),
            archive: false,
            isTrash: false
        }

        notesRef.add(response)
        .then((docRef) => {
            response.id = docRef.id;
        })
        .catch((error) => {
            console.log(error);
            setError(error);
            return false;
        })

        
    }


    return (
        <div className="sidenavbar">
            <div className="sidenavbar-top-header">
                <div className="profile-icon">
                    P
                </div>
                <div className="profile-name">
                    Parth Joshi
                </div>
                <div className="profile-arrow-down">
                    <FontAwesomeIcon icon={faAngleDown} />
                </div>
            </div>
            <div className="sidenavbar-search-bar">
                <div className="search-block">
                    <FontAwesomeIcon className='icon' icon={faSearch} />
                    <input type="text" placeholder="Search"/>
                </div>
                
            </div>
            <div className="sidenavbar-button" onClick={handleCreateNote}>
                <div className="buttonblock">
                    <FontAwesomeIcon className="icon" icon={faPlus} />
                    <button className="title" >
                        New Note
                    </button>

                </div>
            </div>
            <div className="sidenavbar-menu-items">
                <ul>
                    <li>
                        <NavLink to="/all-notes">
                            <FontAwesomeIcon icon={faStickyNote} className='icon' /> All Notes
                        </NavLink>
                        
                    </li>
                    <li>
                        <NavLink to="/trash">
                            <FontAwesomeIcon icon={faTrash} className='icon' /> Trash  
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/todo">
                            <FontAwesomeIcon icon={faList} className='icon' /> Todo List
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/pomodoro">
                            <FontAwesomeIcon icon={faClock} className='icon' /> Pomodoro Clock 
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="sidenavbar-bottom">
                <div className="sidenavbar-need-help">
                    <FontAwesomeIcon icon={faInfo} className='icon' />
                    Need a little help?
                </div>
            </div>
        </div>

    )
}

export default SideNavBar
