import React, {useState, useEffect} from 'react'
import TodoForm from './TodoForm'
import './Todo.scss'
import firebase from '../../firebase'

const todoRef = firebase.collection('todos');

function Todo() {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        todoRef.onSnapshot((snapshot) => {
            let response = [];
            snapshot.docs.forEach((doc) => (
                response.push({
                    id: doc.id,
                    ...doc.data(),
                })
            ))
            setTasks(response);
        })
        
    }, [])

    const addTask = (title) => {
        const newTask = [...tasks, {
            title,
            completed: false
        }]
        setTasks(newTask);
    }

    const deleteTodo = (todoTask,todoIndex) => {
        const newTodo = tasks.filter((_, index) => index !== todoIndex );
        todoRef.doc(todoTask.id).delete()
        .catch((err) => alert(err));
        setTasks(newTodo);
    }
    



    return (
        <div className="container">
            <TodoForm addTask={addTask} />
            <ul>
                {
                     tasks.map((task,idx) => (
                        <li key={idx} onClick={() => deleteTodo(task,idx)}>{task.title}</li>
                        )
                    )
                }
            </ul>
                
            
            
    
            

        </div>
    )
}

export default Todo

