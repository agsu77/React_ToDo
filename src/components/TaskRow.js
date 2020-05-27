import React from 'react'

export const TaskRows = props => {
 return  <tr key={props.task.name}>
   <td>{props.task.name}</td>
   <td>
     <input type='checkbox' 
            checked={props.task.done} 
            onChange ={() => props.changeDone(props.task)} />
   </td>
 </tr>

}

