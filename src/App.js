// import ToDoList from "./components/ToDoList"

// function App() {
// 	return (
// 		<div>
// 			<ToDoList />
// 		</div>
// 	)
// }

// export default App


import { BrowserRouter,Routes,Route } from "react-router-dom";
import ToDoList from "./components/ToDoList";
import Login from "./Login"


function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={`/`} element={<Login/>}/>
				<Route path={`/ToDoList`} element={<ToDoList/>}/>
			</Routes>
		</BrowserRouter>
	)
}

export default App