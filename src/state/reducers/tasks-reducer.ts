import { TasksStateType } from '../../App';
import { v1 } from 'uuid';
import { AddTodoListType, RemoveTodoListType } from './todoLists-reducer';

type AddTaskType = {
    type: 'ADD-TASK'
    todoListId: string
    taskTitle: string
}
type RemoveTaskType = {
    type: 'REMOVE-TASK'
    todoListId: string
    taskId: string
}
type ChangeTaskTitleType = {
    type: 'CHANGE-TASK-TITLE'
    todoListId: string
    taskId: string
    newTitle: string
}
type ChangeTaskStatusType = {
    type: 'CHANGE-TASK-STATUS'
    todoListId: string
    taskId: string
    newStatus: boolean
}

type ActionTypes =
    AddTaskType
    | RemoveTaskType
    | ChangeTaskTitleType
    | ChangeTaskStatusType
    | AddTodoListType
    | RemoveTodoListType

export function tasksReducer(state: TasksStateType, action: ActionTypes): TasksStateType {
    switch (action.type) {
        case 'ADD-TASK':
            return {
                ...state,
                [action.todoListId]: [{
                    taskId: v1(),
                    status: false,
                    taskTitle: action.taskTitle
                }, ...state[action.todoListId]]
            }
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter((task) => task.taskId !== action.taskId)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map((t) => t.taskId === action.taskId ? {
                    ...t,
                    taskTitle: action.newTitle
                } : t)
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map((t) => t.taskId === action.taskId ? {
                    ...t,
                    status: action.newStatus
                } : t)
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todoListId]: []
            }
        case 'REMOVE-TODOLIST':
            const copyState = {...state}
            delete copyState[action.todoListId]
            return copyState
        default:
            return state
    }
}

export const addTaskAC = (todoListId: string, taskTitle: string): AddTaskType => {
    return {type: 'ADD-TASK', todoListId, taskTitle}
}
export const removeTaskAC = (todoListId: string, taskId: string): RemoveTaskType => {
    return {type: 'REMOVE-TASK', todoListId, taskId}
}
export const changeTaskTitleAC = (todoListId: string, taskId: string, newTitle: string): ChangeTaskTitleType => {
    return {type: 'CHANGE-TASK-TITLE', todoListId, taskId, newTitle}
}
export const changeTaskStatusAC = (todoListId: string, taskId: string, newStatus: boolean): ChangeTaskStatusType => {
    return {type: 'CHANGE-TASK-STATUS', todoListId, taskId, newStatus}
}