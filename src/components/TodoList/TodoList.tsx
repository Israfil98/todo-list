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
    changeTaskStatus: (taskId: string, newStatus: boolean) => void
}

function TodoList(props: PropsType) {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const onTaskTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }
    const onNewTaskAddHandler = () => {
        if (title.trim() !== '') {
            props.addTask(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.ctrlKey && e.charCode === 13) {
            onNewTaskAddHandler()
        }
        setError(null)
    }

    return (
        <div>
            <h3>{ props.todoListTitle }</h3>
            <div>
                <input className={ error ? 'error' : '' } placeholder='Enter title' value={ title }
                       onChange={ onTaskTitleChangeHandler } onKeyPress={ onKeyPressHandler }/>
                <button onClick={ onNewTaskAddHandler }>+</button>
                { error && <div className='error-message'>{ error }</div> }
            </div>
            <ul>
                {
                    props.tasks.map((task) => {
                        const removeTaskHandler = () => {
                            props.removeTask(task.taskId)
                        }
                        const onTaskChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(task.taskId, e.currentTarget.checked)
                        }

                        return (
                            <li key={ task.taskId }>
                                <input type="checkbox" checked={ task.status } onChange={ onTaskChangeHandler }/>
                                <span>{ task.taskTitle }</span>
                                <button onClick={ removeTaskHandler }>x</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button className={ props.filter === 'all' ? 'active-filter' : '' }
                        onClick={ () => props.changeFilter('all') }>All
                </button>
                <button className={ props.filter === 'active' ? 'active-filter' : '' }
                        onClick={ () => props.changeFilter('active') }>Active
                </button>
                <button className={ props.filter === 'completed' ? 'active-filter' : '' }
                        onClick={ () => props.changeFilter('completed') }>Completed
                </button>
            </div>
        </div>
    );
}

export default TodoList;
