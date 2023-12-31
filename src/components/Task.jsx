import React, {Component} from 'react'
import { BsCheckCircle, BsCheckCircleFill, BsTrash, BsTrashFill } from "react-icons/bs";
import {motion} from 'framer-motion';
import {textPriorityColor, bgPriorityColor,iconPriorityColor} from "./color_info"

export default class Task extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            complete: false,
            editMode: false,
            dueDate: this.props.itemData.dueDate,
            priority: this.props.itemData.priority,
            description: this.props.itemData.description
        };

        this.onComplete = this.onComplete.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }
   
    
    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
      }
    
      componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
      }

      handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target) && this.state.editMode) {
            this.editTask();
        }
      }

    editTask() {
        this.setState({ editMode: false});
        this.props.editTask(this.props.itemData.id, this.state.dueDate, this.state.description, this.state.priority)
    }

    onComplete(latest) 
    {
        if (latest.scale === 0)
        {
            this.props.completeTask(this.props.itemData.id)
        }       
    }

    onRemove()
    {
        this.props.removeTask(this.props.itemData.id)
    }

    render() {
        return(
            <motion.div 
            layout
            // initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
                scale: this.state.complete ? 0: 1, 
                opacity: this.state.complete ? 0: 1
            }}
            transition={{ 
                delay: 0.2,
                ease: "backIn",
                layout: { duration: 0.15,  delay: 0.125, type: "spring", stiffness: 400, damping: 17}
            }}

            onAnimationComplete={this.onComplete}
            className='flex justify-center items-center'>
                <div>
                    <div 
                    className={textPriorityColor(this.state.priority) + bgPriorityColor(this.state.priority) + 'transition-transform duration-200 w-80 shadow-md shadow-black/30 px-4 py-1 h-20 rounded-2xl grid grid-flow-col'}>
                        
                        <div 
                        className='my-auto w-full'
                        onClick={() => this.setState({ editMode: true})}
                        ref={this.wrapperRef}>

                            {!this.state.editMode &&
                            <div>
                                <h1 className='text-sm font-semibold'>{this.state.dueDate}</h1>
                                <h1 className='h-flex w-full text-xl font-bold'>{this.state.description}</h1>
                            </div>}

                        {/* ==== EditMode Tasks ==== */}

                            {this.state.editMode &&
                            <div className='w-full flex'>
                                <form 
                                className='grid grid-flow-row gap-1'
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    this.editTask()}}>
                                    <select 
                                    className = "text-sm font-semibold rounded-3xl px-1 mr-auto"
                                    defaultValue={this.state.dueDate}
                                    onChange={(e)=> this.setState({ dueDate: e.target.value})}> 
                                        <option value="Now">Now</option>
                                        <option value="Later">Later</option>
                                        <option value="Whenever">Whenever</option>
                                    </select>

                                    <input 
                                    className = "text-xl font-bold mr-auto"
                                    type="text" 
                                    defaultValue={this.state.description} 
                                    onChange={(e)=> this.setState({ description: e.target.value})}/>

                                    <select className = "text-sm font-semibold rounded-3xl px-1 mr-auto"
                                    defaultValue={this.state.priority}
                                    onChange={(e)=> this.setState({ priority: e.target.value})}> 
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                </form>

                                <motion.button 
                                onClick={this.onRemove}
                                whileHover={{ scale: 1.33 }}
                                whileTap={{ scale: 0.5 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                className={iconPriorityColor(this.state.priority) + "ml-auto"}>
                                    {<BsTrash size={35}/>}
                                </motion.button>
                            </div>}

                        </div>
                        
                        {!this.state.editMode &&
                        <div className='relative'>                     
                            <motion.button 
                                onClick={() =>  this.setState({ complete: true })}
                                whileHover={{ scale: 1.33 }}
                                whileTap={{ scale: 0.5 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                className={iconPriorityColor(this.state.priority) + 'absolute right-0 top-0 bottom-0'}
                            >
                                {this.state.complete ? <BsCheckCircleFill size={35}/> : <BsCheckCircle size={35}/>}
                            </motion.button>
                        </div>}

                    </div>
                </div>
            </motion.div>
        )
    }
}