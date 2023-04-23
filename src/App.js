import React, { useEffect, useState } from "react";
import TodoList from './Todo/TodoList';
import Context from "./context";
import AddTodo from "./Todo/AddTodo";
import Loader from "./Loader";
function App() {


    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
            .then(response => response.json())
            .then(tasks => {
                setTimeout(()=>{
                    setTasks(tasks)
                    setLoading(false)
                    }, 2000
                )
            })
    }, [])

    function toggleTodo (id) {
        setTasks(
            tasks.map((todo) => {
            if(todo.id === id) {
                todo.completed = !todo.completed
            }
            return todo
        })
        )
    }


    function removeTask (id) {

        setTasks(
            tasks.filter(todo => todo.id !== id)
        )
    }

    function addTask (title) {
        setTasks(
            tasks.concat([
                {
                    title: title,
                    id: tasks.length + 1,
                    completed: false
                }
            ])
        )
    }

  return (
      <Context.Provider value={{removeTask}}>
        <div className="wrapper">
          <h1>React tutorial</h1>
            <AddTodo onCreate={addTask}/>
            {loading && <Loader/>}
            {tasks.length ? <TodoList tasks = {tasks} onToggle={toggleTodo}/> :
                (loading ? null : <p>No tasks!</p>)}

        </div>
      </Context.Provider>
  );
}

export default App;
