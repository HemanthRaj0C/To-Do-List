import React, {useState,useEffect,useCallback,useRef,useReducer} from "react";

function ToDoList(){

    const todoReducer=(state,action)=>{
        switch(action.type){
            case 'addTask':
                return [...state,{text:action.payload}];
            case 'removeTask':
                return state.filter((_,i)=>i!==action.payload);
            case 'moveUp':
                if(action.payload>0){
                    const updatedState=[...state];
                    [updatedState[action.payload],updatedState[action.payload-1]]=[updatedState[action.payload-1],updatedState[action.payload]];
                    return updatedState;
                }
                return state;
            case 'moveDown':
                if(action.payload<state.length-1){
                    const updatedState=[...state];
                    [updatedState[action.payload],updatedState[action.payload+1]]=[updatedState[action.payload+1],updatedState[action.payload]];
                    return updatedState;
                }
                return state;
            case 'toggleComplete':
                return state.map((task, index) => 
                    index === action.payload ? { ...task, completed: !task.completed } : task
                );
            case 'clearTask':
                return []
            default:
                return state;
        }
    }

    const inputRef=useRef();
    const[tasks,dispatch]=useReducer(todoReducer,[]);
    const[newTask,setNewTask]=useState('');
    const updateRef= useCallback(()=>{
        inputRef.current.focus();
    },[])

    useEffect(()=>{
        updateRef();
    },[updateRef])

    const handleInput=useCallback((event)=>{
        setNewTask(event.target.value);
    },[])

    const addTask=useCallback(()=>{
        if(newTask.trim()){
            dispatch({type:'addTask',payload:newTask.trim()});
            setNewTask('');
        }
    },[newTask]);

    const removeTask=useCallback((index)=>{
        dispatch({type:'removeTask',payload:index});
    },[])

    const moveUp=useCallback((index)=>{
        dispatch({type:'moveUp',payload:index});
    },[])

    const moveDown=useCallback((index)=>{
        dispatch({type:'moveDown',payload:index});
    },[])

    const toggleComplete=useCallback((index)=>{
        dispatch({type:'toggleComplete',payload:index});
    },[])

    const clearTask=useCallback(()=>{
        dispatch({type:'clearTask'})
    })

    return(<div className="flex flex-col items-center justify-center min-h-screen">

    <h1 className="text-center border-2 p-2 border-black rounded-3xl font-bold text-4xl mb-10 transition transform duration-300 hover:scale-110">To Do List</h1>

    <input className="border-black border-2 rounded-2xl p-1 transition transform hover:scale-105" type="text" ref={inputRef} onClick={updateRef} onKeyDown={(e)=>{e.key ==='Enter' && addTask()}} onChange={handleInput} value={newTask} placeholder="Enter a Task..."/>
    <div>
    <button className="border-2 border-black m-3 p-1 rounded-full bg-green-400 transition transform duration-200 hover:scale-95" onClick={addTask}>Add Task</button>
    <button className="border-2 border-black m-3 p-1 rounded-full bg-red-500 transition transform duration-200 hover:scale-95" onClick={clearTask}>Clear Task</button>
    </div>

    <ul>
        {tasks.map((task,index)=>(
            <li key={index}>
                <input className="" type="checkbox" checked={task.completed} onChange={()=>toggleComplete(index)} />
                <span className={`text-xl font-medium ${task.completed ? 'line-through' : ''}`}>
                        {task.text}
                </span>
                <div>
                <button className="border-2 border-black mr-5 ml-5 mt-2 mb-2 p-1 rounded-full bg-red-500 transition transform duration-200 hover:scale-95" onClick={()=>removeTask(index)}>Remove Task</button>
                <button className="border-2 border-black mr-5 p-1 rounded-full bg-blue-400 transition transform duration-200 hover:scale-95" onClick={()=>moveUp(index)}>Move Up ☝️</button>
                <button className="border-2 border-black p-1 rounded-full bg-blue-400 transition transform duration-200 hover:scale-95" onClick={()=>moveDown(index)}>Move Down 👇</button>
                </div>
            </li>
        ))}
    </ul>
    </div>)
}

export default ToDoList