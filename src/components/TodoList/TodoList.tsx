import React, { ChangeEvent } from 'react';

import { FilterValuesType, TaskType } from '../../App';
import AddItemForm from '../common/AddItemForm/AddItemForm';
import EditableSpan from '../common/EditableSpan/EditableSpan';

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
    changeTaskTitle: (todoListId: string, taskId: string, newTitle: string) => void
    changeTodoListTitle: (todoListId: string, newTitle: string) => void
}

function TodoList(props: PropsType) {
    const removeTodoListHandler = () => {
        props.removeTodoList(props.id)
    }
    const addTaskHandler = (title: string) => {
        props.addTask(props.id, title)
    }
    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={ props.todoListTitle } onTitleChange={ changeTodoListTitle }/>
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
                        const onTaskStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(props.id, task.taskId, e.currentTarget.checked)
                        }
                        const onTaskTitleChangeHandler = (newTitle: string) => {
                            props.changeTaskTitle(props.id, task.taskId, newTitle)
                        }

                        return (
                            <li key={ task.taskId }>
                                <input type="checkbox" checked={ task.status } onChange={ onTaskStatusChangeHandler }/>
                                <EditableSpan title={ task.taskTitle } onTitleChange={ onTaskTitleChangeHandler }/>
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
