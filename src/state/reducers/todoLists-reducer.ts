import { FilterValuesType, TodoListType } from '../../App';
import { v1 } from 'uuid';

export type RemoveTodoListType = {
    type: 'REMOVE-TODOLIST'
    todoListId: string
}
export type AddTodoListType = {
    type: 'ADD-TODOLIST'
    todoListId: string
    title: string
}
type ChangeTodoListTitleType = {
    type: 'CHANGE-TODOLIST-TITLE'
    todoListId: string
    newTitle: string
}
type ChangeTodoListFilterType = {
    type: 'CHANGE-TODOLIST-FILTER'
    todoListId: string
    newFilter: FilterValuesType
}

type ActionTypes = RemoveTodoListType | AddTodoListType | ChangeTodoListTitleType | ChangeTodoListFilterType

export function todoListsReducer(state: Array<TodoListType>, action: ActionTypes): Array<TodoListType> {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter((tl) => tl.todoListId !== action.todoListId)
        case 'ADD-TODOLIST':
            return [{todoListId: action.todoListId, todoListTitle: action.title, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map((tl) => tl.todoListId === action.todoListId ? {...tl, todoListTitle: action.newTitle} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map((tl) => tl.todoListId === action.todoListId ? {...tl, filter: action.newFilter} : tl)
        default:
            return state
    }
}

export const removeTodoListAC = (todoListId: string): RemoveTodoListType => {
    return {type: 'REMOVE-TODOLIST', todoListId}
}

export const addTodoListAC = (title: string): AddTodoListType => {
    return {type: 'ADD-TODOLIST', todoListId: v1(), title}
}

export const changeTodoListTitleAC = (todoListId: string, newTitle: string): ChangeTodoListTitleType => {
    return {type: 'CHANGE-TODOLIST-TITLE', todoListId, newTitle}
}

export const changeTodoListFilterAC = (todoListId: string, newFilter: FilterValuesType): ChangeTodoListFilterType => {
    return {type: 'CHANGE-TODOLIST-FILTER', todoListId, newFilter}
}