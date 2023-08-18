import React from 'react'
import Item from './Item'

function ItemList({items, removeItem}) 
{

  return (
    <div className='w-full mx-auto'>
        <div className='flex flex-col gap-2 mx-auto'>    
        <div className='bg-gray-500 h-100px w-100px mx-auto'>+</div>
            { items.map((item) => (
              <Item
              key={item.id}
              itemData ={item}
              removeItem={removeItem}
              />
            ))}
      </div>
    </div>
  )
}

export default ItemList