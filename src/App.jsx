import Navbar from "./components/Navbar"
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {
  const [todo,settodo] = useState('')
  const [todos,settodos]=useState([])
  const[finsh,setfinsh]=useState(true)

  useEffect(()=>{
    let todoString=localStorage.getItem("todos")
    if(todoString){
      let todos=JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
   
  },[])

  const saveTols=() => {
    localStorage.setItem("todos",JSON.stringify(todos))
    
  }
  const toogleFinished=()=>{
          setfinsh(!finsh)
  }
  

 let  handleAdd=()=>{
       settodos([...todos,{id:uuidv4(),todo,isCompleted:false}])
       settodo("")
       console.log(todos);
       saveTols()
  }

  let handleDelete=(e,id)=>{
    let index=todos.findIndex(item=>{
      return item.id==id;
     })
     let newTodos=todos.filter(item=>{
      return item.id!=id
     });
     settodos(newTodos)
     saveTols()

  }

  let handleEdit=(e,id)=>{
   let t= todos.filter(i=>i.id==id)
    settodo(t[0].todo)
    let newTodo=todos.filter(item=>{
      return item.id!=id
    })
    settodos(newTodo)
    saveTols()


  }

  let handleChange=(e)=>{
          settodo(e.target.value)
  }

  let handelCheckbox=(e)=>{
        let id=  e.target.name
       let index=todos.findIndex(item=>{
        return item.id==id;
       })

       let newTodos=[...todos];
       newTodos[index].isCompleted=!newTodos[index].isCompleted;
       settodos(newTodos)
  }


  return (
    <>
    <Navbar></Navbar>
      <div className="mx-3 md:container  md:mx-auto my-5 rounded-xl p-5  bg-violet-300 shadow-lg shadow-cyan-500/50  min-h-[80vh] md:w-1/2">
        <h1 className="font-bold text-center text-3xl">I Manage Your Task!</h1>
     
           <div className="addTodo my-5 flex flex-col gap-4">
            <h2 className="text-lg font-bold">Add to Todo :</h2>
            <div className="flex ">
            <input onChange={handleChange} value={todo} type="text"  className="w-full rounded-md px-5  py-1 divide-stone-950"></input>
            <button  onClick={handleAdd} disabled={todo.length<=3} className="bg-violet-800 disabled:bg-violet-400 hover:bg-red-900 p-2 py-1 text-white text-sm font-bold mx-1  rounded-md">Save</button>
            </div>
           </div>
           <input onChange={toogleFinished} type="checkbox" checked={finsh}></input>     Show Finished
           <h2 className="text-lg  font-bold">Your Todos :</h2>
           {todos.length===0 && <div className="m-5 text-red-600"> No todos to display</div>}
          <div className="todos">
            { todos.map(item=>{


            return (finsh || !item.isCompleted) && <div  key={item.id} className="todo flex w-full my-4 justify-between">
              <div className="flex gap-5">
              <input type="checkbox" name={item.id} onChange={handelCheckbox} checked={item.isCompleted}></input>
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button  onClick={(e)=>{handleEdit(e,item.id)}}  className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white text-sm font-bold  rounded-lg mx-1"><FaEdit /></button>
                <button  onClick={(e)=>{handleDelete(e,item.id)}} className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white text-sm font-bold  rounded-lg mx-1"><MdDelete/></button>
              </div>
            </div>
            
            })}
          </div>
       
        
     </div>
    </>
  )
}

export default App
