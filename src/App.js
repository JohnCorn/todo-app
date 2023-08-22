import React,{useEffect, useState} from "react";
import TaskList from "./components/TaskList";
import NavBar from "./components/NavBar";

function App() {

  const [tasks, setTasks] = useState([])
  const [priorityFilter, setPriorityFilter] = useState("")
  const [dueDateFilter, setdueDateFilter] = useState("")

  useEffect(() => {
    fetch("http://localhost:3000/items/")
    .then(response => response.json())
    .then(data => setTasks(data))
  }, [tasks])

  function handleAddItem(item)
  {
    const configObj = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(item)
     }
     
     fetch('http://localhost:3000/items', configObj)
      .then(res => res.json())
      .then(data =>  setTasks([...tasks, data]))
  }

  function handleCompleteTask(id) 
  {
    console.log('handleCompleteTask')
  }

  function handleRemoveTask(id) 
  {
    console.log("handleRemoveTask")

    const configObj = {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
     }

     fetch(`http://localhost:3000/items/${id}`, configObj)
  }

  function handleEditTask(id, dueDate, description, priority) {
    const configObj = {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'dueDate': dueDate, 'description' :description, 'priority' : priority})
     }

    fetch(`http://localhost:3000/items/${id}`, configObj)
    .then(res => res.json())
    .then(data =>  setTasks([...tasks, data]))
  }

  const filterTasks = tasks.filter((item) =>
  {
      if (priorityFilter === "")
        return true

      return item.priority === priorityFilter
    }
    ).filter((i) => {
    if (dueDateFilter === "")
      return true

    return i.dueDate === dueDateFilter
  })

  return (
    <div>

      <NavBar
      priorityFilter={priorityFilter}
      filterByPriority={setPriorityFilter}
      dueDateFilter={dueDateFilter}
      filterByDueDate={setdueDateFilter}
      />

      <TaskList 
            tasks={filterTasks} 
            completeTask={handleCompleteTask}
            removeTask={handleRemoveTask}    
            editTask={handleEditTask}   
      />
    </div>
  );
}

export default App;