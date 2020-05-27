import React, {useState, useEffect} from 'react';
import {TaskRows} from './components/TaskRow';
import {TaskBanner} from './components/TaskBanner';
import {TaskCreator} from './components/TaskCreator'
import {VisibilityControl} from './components/VisibilityControl'

function App() {

  const [showCompleted, setShowCompleted] = useState(true);
  const [userName, setUserName] = useState('Agsu');
  const [taskItem, setTaskItem] = useState([]);

  useEffect( () => {
    let data = localStorage.getItem('task');
    if(data != null){
       setTaskItem(JSON.parse(data));
    }else{
      setTaskItem([
        {name : 'task 1 Example', done: false},
        {name : 'task 2 Example', done: false},
      ])
      setShowCompleted(true)
    }
  }, [] )

  useEffect( () => {
    localStorage.setItem('task', JSON.stringify(taskItem))
  }, [taskItem])

  const toggleTask = task =>{
    setTaskItem(taskItem.map(t => (t.name === task.name ? {...t, done: !t.done} : t )))
  }

  const taskTableRows = (doneValue) => (
    taskItem.filter( t => t.done === doneValue)
    .map(task =>(
     <TaskRows task={task} key={task.name} changeDone={toggleTask} ></TaskRows>
     ) )
  )

  const newTask = taskName => {
    if (!taskItem.find(t => t.name === taskName)){
      setTaskItem([...taskItem, {name: taskName, done: false}])
    }
  }
  
  return (
    <div className="App text-center">
      <TaskBanner user={userName} task={taskItem} ></TaskBanner>
      <TaskCreator callback={newTask} />
      <table className='container table table-striped table-bordered'>
        <thead>
          <tr>
            <th> Description </th>
            <th> Done </th>
          </tr>
        </thead>
        <tbody>
          {taskTableRows(false)}
        </tbody>
      </table>

      <div className='bg-secondary text-white text-center p-2'>
        <VisibilityControl isChecked={showCompleted} callback={checked => setShowCompleted(checked)} />
      </div>

      {
        showCompleted && (
          <table className='container table table-striped table-bordered'>
            <thead>
              <tr>
                <th>
                  Description
                </th>
                <th>
                  Done
                </th>
              </tr>
            </thead>
            <tbody>
          {taskTableRows(true)}
        </tbody>
          </table>
        )
      }

    </div>
  );
}

export default App;
