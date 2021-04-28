import React, {useContext, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faSearch, faPlus, faStar, faTrash, faStickyNote, faInfo} from '@fortawesome/free-solid-svg-icons'
import './SideNavBar.scss'
import { NavLink , useHistory} from 'react-router-dom'
import DataService from '../../utils/apiRequests'
import { NotesContext } from '../../context/context'

function SideNavBar() {
    const notesContext = useContext(NotesContext);
    const history = useHistory();
    const [error, setError] = useState(null);
//    const [notes , setNote] = useState({
//        title: "",
//        description: "",
//        date: ""
//    })

//     const handleCreateNote =  () => {
//         // e.preventDefault();

//         setNote({
//             title: "Untitled",
//             description: "Start Writing",
//             date: Date.now()
//         })
        
//         db.collection("notes").add({
//             title: notes.title,
//             description: notes.description,
//             date: notes;
//         })
//         .then((docRef) => {
//             console.log("Document written with ID: ", docRef.id);
//         })
//         .catch((error) => {
//             console.error("Error adding document: ", error);
//         });
//         // const db = firebase.firestore();
//         // db.settings({
//         //     timestampsInSnapshots: true
//         // });
//         // const userRef = db.collection("notes").add({
//         //     title: title,
//         //     description: description
//         // });
//         setTitle('');
//         setDescription('');
//         setDate(Date.toLocaleString());
//     }
    const handleCreateNote = () => {
        // db.collection("notes").add({
        //     title: "Untitled",
        //     description: "",
        //     createdAt: Date.now(),
        //     updatedAt: Date.now(),
        //     archive: false
        // })
        // .then((res) => {
        //     console.log(res.id);
        // })
        // .catch((error) => {
        //     console.error("Error adding document: ", error);
        // });
        let data = {
                title: "Untitled",
                description: "",
                createdAt: Date.now(),
                updatedAt: Date.now(),
                archive: false
        }
        DataService.create(data)
        .then((res) => {
            console.log(res.id);
            notesContext.notesDispatch({type: 'createNoteSuccess', payload: data });
            history.push({
                pathname: `/all-notes/${res.id}`,
                note: data
            })
        })
        .catch(err => setError(err));
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
                        <NavLink to="/dummy-1">
                            <FontAwesomeIcon icon={faStar} className='icon' /> Dummy 
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/all-notes">
                            <FontAwesomeIcon icon={faStickyNote} className='icon' /> All Notes
                        </NavLink>
                        
                    </li>
                    <li>
                        <NavLink to="/dummy-2">
                            <FontAwesomeIcon icon={faStar} className='icon' /> Dummy 
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/trash">
                            <FontAwesomeIcon icon={faTrash} className='icon' /> Trash  
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
