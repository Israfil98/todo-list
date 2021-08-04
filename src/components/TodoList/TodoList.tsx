import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

import { FilterValuesType, TaskType } from '../../App';

//типизируем пропсы для компонента TodoList
type PropsType = {
    todoListTitle: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    filter: FilterValuesType
    changeFilter: (newFilter: FilterValuesType) => void
    addTask: (taskTitle: string) => void
}

function TodoList(props: PropsType) {
    const [title, setTitle] = useState<string>('')

    const onTaskTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }
    const onNewTaskAddHandler = () => {
        props.addTask(title)
        setTitle('')
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.ctrlKey && e.charCode === 13) {
            onNewTaskAddHandler()
        }
    }


    return (
        <div>
            <h3>{ props.todoListTitle }</h3>
            <div>
                <input value={ title } onChange={ onTaskTitleChangeHandler } onKeyPress={ onKeyPressHandler }/>
                <button onClick={ onNewTaskAddHandler }>+</button>
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
