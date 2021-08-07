import { TasksStateType } from '../../App';
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from '../reducers/tasks-reducer';
import { addTodoListAC, removeTodoListAC } from '../reducers/todoLists-reducer';

let startState: TasksStateType

beforeEach(() => {
    startState = {
        "todoListId1": [
            {taskId: '1', status: true, taskTitle: 'HTML&CSS'},
            {taskId: '2', status: true, taskTitle: 'JS&TS'},
            {taskId: '3', status: true, taskTitle: 'React&Redux'},
        ],
        "todoListId2": [
            {taskId: '1', status: true, taskTitle: 'Bread'},
            {taskId: '2', status: false, taskTitle: 'Milk'},
            {taskId: '3', status: false, taskTitle: 'Honey'},
        ]
    };
})

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC("todoListId2", "2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todoListId1": [
            {taskId: '1', status: true, taskTitle: 'HTML&CSS'},
            {taskId: '2', status: true, taskTitle: 'JS&TS'},
            {taskId: '3', status: true, taskTitle: 'React&Redux'},
        ],
        "todoListId2": [
            {taskId: '1', status: true, taskTitle: 'Bread'},
            {taskId: '3', status: false, taskTitle: 'Honey'},
        ]
    });

    expect(endState["todoListId1"].length).toBe(3)
    expect(endState["todoListId2"].length).toBe(2)
});

test('task should be added to correct array', () => {
    const action = addTaskAC('todoListId2', 'Meat')

    const endState = tasksReducer(startState, action)

    expect(endState['todoListId2'][0].taskTitle).toBe('Meat')
    expect(endState['todoListId2'][0].status).toBe(false)
})

test('task title should be changed to new title', () => {
    const action = changeTaskTitleAC('todoListId2', '1', 'Tea')

    const endState = tasksReducer(startState, action)

    expect(endState['todoListId2'][0].taskTitle).toBe('Tea')
})

test('task status should be changed to new status', () => {
    const action = changeTaskStatusAC('todoListId2', '2', true)

    const endState = tasksReducer(startState, action)

    expect(endState['todoListId2'][1].status).toBe(true)
})

test('new array should be added when new todolist is added', () => {
    const action = addTodoListAC("new todolist");

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== "todoListId1" && k !== "todoListId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
    const action = removeTodoListAC("todoListId2");

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todoListId2"]).not.toBeDefined();
});
