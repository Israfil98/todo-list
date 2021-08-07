import { v1 } from 'uuid';
import { FilterValuesType, TodoListType } from '../../App';
import {
    addTodoListAC, changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from '../reducers/todoLists-reducer';

let todoListId1: string
let todoListId2: string
let startState: Array<TodoListType>

beforeEach(() => {
    todoListId1 = v1()
    todoListId2 = v1()

    startState = [
        {todoListId: todoListId1, todoListTitle: 'What to learn', filter: 'all'},
        {todoListId: todoListId2, todoListTitle: 'What to buy', filter: 'all'}
    ]
})

test('todoList will be removed correctly', () => {
    const action = removeTodoListAC(todoListId1)

    const endState = todoListsReducer(startState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].todoListTitle).toBe('What to buy')
    expect(endState[0].todoListId).toBe(todoListId2)
})

test('todoList should be added', () => {
    const title = 'Title'
    const action = addTodoListAC(title)

    const endState = todoListsReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[0].todoListTitle).toBe(title)
})

test('todoList title should be changed', () => {
    const newTitle = 'New changed Title'
    const action = changeTodoListTitleAC(todoListId1, newTitle)

    const endState = todoListsReducer(startState, action)

    expect(endState[0].todoListTitle).toBe(newTitle)
    expect(endState[1].todoListTitle).toBe('What to buy')
})

test('todoList filter should be changed', () => {
    const newFilter: FilterValuesType = 'active'
    const action = changeTodoListFilterAC(todoListId1, newFilter)

    const endState = todoListsReducer(startState, action)

    expect(endState[0].filter).toBe(newFilter)
})