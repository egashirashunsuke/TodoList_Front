import axios from "axios"
import { useState, useEffect } from "react"
import "./ToDoList.css"

function ToDoList() {
	const [completedTodos, setCompletedTodos] = useState([])
	const [todos, setTodos] = useState([])
	const [todo, setTodo] = useState("")

function handlePush() {
    if (todo !== "") {
        axios.post("http://localhost:8000/api/tasks", {
                name: todo,
            }).then(() => {
            handleGetTodos()
        })
        setTodo("")
    }
}

function handleComplete(index) {
    axios.put("http://localhost:8000/api/tasks/" + todos[index].id).then(() => {
        handleGetTodos()
    })
}

function handleDelete(index) {
    axios.delete("http://localhost:8000/api/tasks/" + completedTodos[index].id).then(() => {
        handleGetTodos()
    })
}

function handleGetTodos() {
    axios.get("http://localhost:8000/api/tasks").then((res) => {
        let tmpCompletedTodos = []
        let tmpTodos = []
        for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].Finished) {
                tmpCompletedTodos = tmpCompletedTodos.concat([
                    {
                        id: res.data[i].ID,
                        name: res.data[i].Name,
                    },
                ])
            } else {
                tmpTodos = tmpTodos.concat([
                    {
                        id: res.data[i].ID,
                        name: res.data[i].Name,
                    },
                ])
            }
        }
        console.log('Todos:', tmpTodos);  // デバッグのために追加
        console.log('Completed Todos:', tmpCompletedTodos);  // デバッグのために追加
        setCompletedTodos(tmpCompletedTodos)
        setTodos(tmpTodos)
    })
}
useEffect(() => {
    handleGetTodos()
}, [])



return (
    <div className="todoList">
        <h1 className="title">企業管理</h1>

        <input value={todo} onChange={(e) => setTodo(e.target.value)} />
        <button onClick={handlePush} className="button">
            登録
        </button>
        
        <h2>企業一覧</h2>
        <h3>選考中</h3>
        <ul className="ul">
            {todos.map((todo, index) => (
                <li key={todo.id} className="li">
                    {todo.name}
                    <button onClick={() => handleComplete(index)} className="ToDo_button">
                        落選
                    </button>
                </li>
            ))}
        </ul>
        <h3>落選</h3>
        <ul className="ul">
            {completedTodos.map((completedTodo, index) => (
                <li key={completedTodo.id} className="li">
                    {completedTodo.name}
                    <button onClick={() => handleDelete(index)} className="ToDo_delete_button">
							企業を消す
					</button>
                </li>
            ))}
        </ul>
       
    
    </div>
)
}

export default ToDoList