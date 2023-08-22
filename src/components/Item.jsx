import React, {Component} from 'react'
import { BsCheckCircle, BsCheckCircleFill, BsTrash, BsTrashFill } from "react-icons/bs";
import {motion} from 'framer-motion';
import {textPriorityColor, bgPriorityColor,iconPriorityColor} from "./color_info"

export default class Item extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            complete: false,
            editMode: false,
            dueDate: this.props.itemData.dueDate,
            priority: this.props.itemData.priority,
            description: this.props.itemData.description
        };

        this.OnComplete = this.OnComplete.bind(this);
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
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.setState({ editMode: false});
        }
      }

    OnComplete(latest) 
    {
        if (latest.scale === 0)
        {
            this.props.removeItem(this.props.itemData.id)
        }       
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

            onAnimationComplete={this.OnComplete}
            className='flex justify-center items-center'>
                <div>
                    <div 
                    className={textPriorityColor(this.state.priority) + bgPriorityColor(this.state.priority) + 'transition-transform duration-200 w-80 shadow-md shadow-black/30 px-4 py-1 h-20 rounded-2xl grid grid-flow-col'}>
                        
                        <div 
                            className='my-auto w-15'
                            onClick={() => this.setState({ editMode: true})}
                            ref={this.wrapperRef}>
                            {!this.state.editMode &&
                            <div>
                            <h1 className='text-sm font-semibold'>{this.state.dueDate}</h1>
                            <h1 className='h-flex w-full  text-xl font-bold'>{this.state.description}</h1>
                            </div>}

                            {this.state.editMode &&
                            <div>
                                <form>
                                    <select 
                                    className = "rounded-3xl px-1"
                                    defaultValue={this.state.dueDate}
                                    onChange={(e)=> this.setState({ dueDate: e.target.value})}> 
                                        <option value="Now">Now</option>
                                        <option value="Later">Later</option>
                                        <option value="Whenever">Whenever</option>
                                    </select>

                                    <input 
                                    type="text" 
                                    defaultValue={this.props.itemData.description} 
                                    onChange={(e)=> this.setState({ description: e.target.value})}/>

                                    <select className = "rounded-3xl px-1"
                                    defaultValue={this.props.itemData.priority}
                                    onChange={(e)=> this.setState({ priority: e.target.value})}> 
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                </form>
                            </div>}

                        </div>

                        {/* ==== Button Icons ==== */}
                        
                        <div className='relative'>
                        {!this.state.editMode &&
                            <motion.button 
                                onClick={() =>  this.setState({ complete: true })}
                                whileHover={{ scale: 1.33 }}
                                whileTap={{ scale: 0.5 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                className={iconPriorityColor(this.state.priority) + 'absolute right-0 top-0 bottom-0'}
                            >
                                {this.state.complete ? <BsCheckCircleFill size={35}/> : <BsCheckCircle size={35}/>}
                            </motion.button>}
                            
                            {this.state.editMode &&
                            <motion.button 
                                onClick={() =>  this.setState({ complete: true })}
                                whileHover={{ scale: 1.33 }}
                                whileTap={{ scale: 0.5 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                className={iconPriorityColor(this.state.priority) + 'absolute right-0 top-0 bottom-0'}
                            >
                                {<BsTrash size={35}/>}
                            </motion.button>
                            }

                        </div>
                    </div>
                </div>
            </motion.div>
        )
    }
}