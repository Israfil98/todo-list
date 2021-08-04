import React from 'react';

import { FilterValuesType, TaskType } from '../../App';

//типизируем пропсы для компонента TodoList
type PropsType = {
    todoListTitle: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    filter: FilterValuesType
    changeFilter: (newFilter: FilterValuesType) => void
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
                {
                    props.tasks.map((task) => {
                        const removeTaskHandler = () => {
                            props.removeTask(task.taskId)
                        }

                        return (
                            <li key={ task.taskId }>
                                <input type="checkbox" checked={ task.status }/>
                                <span>{ task.taskTitle }</span>
                                <button onClick={ removeTaskHandler }>x</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button onClick={ () => props.changeFilter('all') }>All</button>
                <button onClick={ () => props.changeFilter('active') }>Active</button>
                <button onClick={ () => props.changeFilter('completed') }>Completed</button>
            </div>
        </div>
    );
}

export default TodoList;
