import React,{useEffect, useState} from "react";
import ItemList from "./components/ItemList";
import NavBar from "./components/NavBar";

function App() {

  const [items, setItems] = useState([])
  const [priorityFilter, setPriorityFilter] = useState("")
  const [dueDateFilter, setdueDateFilter] = useState("")

  useEffect(() => {
    fetch("http://localhost:3000/items/")
    .then(response => response.json())
    .then(data => setItems(data))
  }, [])

  function handleAddItem(item)
  {
    const configObj = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(item)
     }
     
     fetch('http://localhost:3000/items', configObj)
      .then(res => res.json())
      .then(data =>  setItems([...items, data]))
  }

  function handleRemoveItem(id) 
  {
    console.log(handleRemoveItem)
    const nonRemovedItems = items.filter((item) => item.id !== id)
    setItems(nonRemovedItems)
  }

  const filterItems = items.filter((item) =>
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

      <ItemList 
            items={filterItems} 
            removeItem={handleRemoveItem}       
      />
    </div>
  );
}

export default App;