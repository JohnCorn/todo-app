import React from 'react'
import Task from './Task'
import AddTask from './AddTask'

function TaskList({tasks, completeTask, removeTask, editTask}) {

  return (
    <div className='w-full mx-auto'>
        <div className='flex flex-col gap-2 mx-auto'>    
        <AddTask/>
            { tasks.map((task) => (
              <Task
              key={task.id}
              itemData ={task}
              completeTask={completeTask}
              removeTask={removeTask}
              editTask={editTask}
              />
            ))}
      </div>
    </div>
  )
}

export default TaskList