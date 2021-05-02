import React,{ useState } from 'react'
import './TodoForm.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import firebase from '../../firebase'

const todoRef = firebase.collection('todos');

function TodoForm({ addTask }) {
    const [userInput, setUserInput] = useState('');

    const handleOnChange = (e) => {
        setUserInput(e.target.value);
    }

    const handleCreateTodo = (e) => {
        e.preventDefault();
        if(userInput.length > 0){
            addTask(userInput);
            todoRef.add({
                title: userInput,
                completed: false
            })
            .catch((err) => console.log(err))
        }
        
        setUserInput("");
        e.target.reset();
    }

    return (
        <div className='todo-container'>
            <h1> Task List </h1>
            <div className="todo-search-bar">
                <div className="todo-search-block">
                    <form onSubmit={handleCreateTodo}>
                        <FontAwesomeIcon className='icon' icon={faPlus}/>
                        <input type="text" placeholder="Add Items" required onChange={handleOnChange} />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TodoForm
