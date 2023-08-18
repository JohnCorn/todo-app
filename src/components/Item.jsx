import React, {useState} from 'react'
import { BsCheckCircle, BsCheckCircleFill } from "react-icons/bs";
import {motion} from 'framer-motion';
import {textPriorityColor,bgPriorityColor,iconPriorityColor} from "./color_info"

function Item ({itemData:{ id, description, dueDate, priority}, removeItem}) {

    const [complete, setComplete] = useState(false);

    // TODO: have states for the description, dueDate, priority
    // set them with use effect, then update on form change

    function OnComplete(latest) 
    {
        if (latest.scale === 0)
        {
            removeItem(id)
        }       
    }

    return (
        <motion.div 
        layout
        // initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
            scale: complete ? 0: 1, 
            opacity: complete ? 0: 1
        }}
        transition={{ 
            delay: 0.2,
            ease: "backIn",
            layout: { duration: 0.15,  delay: 0.125, type: "spring", stiffness: 400, damping: 17}
        }}

        onAnimationComplete={OnComplete}
        className='flex justify-center items-center'>     
            <div
            >
                <div 
                className={bgPriorityColor(priority) + textPriorityColor(priority) + 'transition-transform duration-200  w-80 shadow-md shadow-black/30 px-4 py-1 h-20 rounded-2xl grid grid-flow-col'}>
                    
                    <div className='my-auto w-15'>
                        <h1 className='text-sm font-semibold'>{dueDate}</h1>
                        <h1 className='h-flex w-full  text-xl font-bold'>{description}</h1>
                    </div>

                    <div className='relative'>
                        <motion.button 
                            onClick={() => setComplete(true)}
                            whileHover={{ scale: 1.33 }}
                            whileTap={{ scale: 0.5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            className={iconPriorityColor(priority) + 'absolute right-0 top-0 bottom-0'}
                        >
                            {complete ? <BsCheckCircleFill size={35}/> : <BsCheckCircle size={35}/>}
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Item