import React from 'react'

function NavBar({priorityFilter, filterByPriority, dueDateFilter, filterByDueDate}) {
  return (
    <div>
          <div className='bg-slate-800 py-2 px-4 rounded-3xl'> 

<label className='text-gray-100 font-semibold pr-2'>Date</label>

  <select className = "rounded-3xl px-1"
    value={dueDateFilter}
    onChange={(e)=> filterByDueDate(e.target.value)}
    > 
      <option value="">All</option>     
      <option value="Today">Today</option>
      <option value="Tomorrow">Tomorrow</option>
      <option value="Later">Later</option>
  </select>

  <label className='pl-4 pr-2 text-gray-100 font-semibold '>Priority</label>
  <select className = "rounded-3xl px-1"
    value={priorityFilter}
    onChange={(e)=> filterByPriority(e.target.value)}
    > 
      <option value="">All</option>     
      <option value="Low">Low</option>
      <option value="Medium">Medium</option>
      <option value="High">High</option>
  </select>
</div>
    </div>
  )
}

export default NavBar