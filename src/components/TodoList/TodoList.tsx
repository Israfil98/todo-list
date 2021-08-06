import React, { ChangeEvent } from 'react';

import { FilterValuesType, TaskType } from '../../App';
import AddItemForm from '../common/AddItemForm/AddItemForm';

//типизируем пропсы для компонента TodoList
type PropsType = {
    id: string
    todoListTitle: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (todoListId: string, taskId: string) => void
    changeFilter: (todoListId: string, newFilter: FilterValuesType) => void
    addTask: (todoListId: string, taskTitle: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, newStatus: boolean) => void
    removeTodoList: (todoListId: string) => void
}

function TodoList(props: PropsType) {
    const removeTodoListHandler = () => {
        props.removeTodoList(props.id)
    }
    const addTaskHandler = (title: string) => {
        props.addTask(props.id, title)
    }

    return (
        <div>
            <h3>{ props.todoListTitle }
                <button onClick={ removeTodoListHandler }>x
                </button>
            </h3>
            <AddItemForm addItem={ addTaskHandler }/>
            <ul>
                {
                    props.tasks.map((task) => {
                        const removeTaskHandler = () => {
                            props.removeTask(props.id, task.taskId)
                        }
                        const onTaskChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(props.id, task.taskId, e.currentTarget.checked)
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
                        onClick={ () => props.changeFilter(props.id, 'all') }>All
                </button>
                <button className={ props.filter === 'active' ? 'active-filter' : '' }
                        onClick={ () => props.changeFilter(props.id, 'active') }>Active
                </button>
                <button className={ props.filter === 'completed' ? 'active-filter' : '' }
                        onClick={ () => props.changeFilter(props.id, 'completed') }>Completed
                </button>
            </div>
        </div>
    );
}

export default TodoList;
