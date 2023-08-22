import React from 'react'
import Task from './Task'

function TaskList({tasks, completeTask, removeTask, editTask}) {

  return (
    <div className='w-full mx-auto'>
        <div className='flex flex-col gap-2 mx-auto'>    
        <div className='bg-gray-500 h-100px w-100px mx-auto'>+</div>
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