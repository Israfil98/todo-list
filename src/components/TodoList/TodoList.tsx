import React from 'react';

import { TaskType } from '../../App';

//типизируем пропсы для компонента TodoList
type PropsType = {
    todoListTitle: string
    tasks: Array<TaskType>
}

function TodoList(props: PropsType) {
    return (
        <div>
            <h3>{ props.todoListTitle }</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                <li>
                    <input type="checkbox" checked={ props.tasks[0].status }/><span>{ props.tasks[0].taskTitle }</span>
                </li>
                <li>
                    <input type="checkbox" checked={ props.tasks[1].status }/><span>{ props.tasks[1].taskTitle }</span>
                </li>
                <li>
                    <input type="checkbox" checked={ props.tasks[2].status }/><span>{ props.tasks[2].taskTitle }</span>
                </li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
}

export default TodoList;