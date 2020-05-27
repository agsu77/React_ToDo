import React from 'react';

export const TaskBanner = props => (
    <div className='navbar navbar-light bg-info mb-2'>
        <h3 className='navbar-brand'>{props.user} Task Manager <span className="badge badge-danger"> {props.task.filter( t => !t.done).length} </span>
         </h3>
    </div>
)