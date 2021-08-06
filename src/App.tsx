import React, { useState } from 'react';
import { v1 } from 'uuid';

import './App.css';

import TodoList from './components/TodoList/TodoList';
import AddItemForm from './components/common/AddItemForm/AddItemForm';

//типизируем обьект Task, для того чтобы не ошибиться в написании св-в и не пропустить один из них
export type TaskType = {
    status: boolean
    taskId: string
    taskTitle: string
}
export type FilterValuesType = 'all' | 'completed' | 'active'
type TodoListType = {
    todoListId: string
    todoListTitle: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    //создаем наш псевдо стейт, которые будем передавать в TodoList компоненту в качестве пропсов
    //так же указываем нужный тип данных стейта
    //засовываем наш стейт в хук useState, для того чтобы реакт мог понимать когда ему перерисовывать UI

    const todoListId1 = v1()
    const todoListId2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {todoListId: todoListId1, todoListTitle: 'What to learn', filter: 'all'},
        {todoListId: todoListId2, todoListTitle: 'What to buy', filter: 'active'}
    ])
    const [tasksObj, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {taskId: v1(), status: true, taskTitle: 'HTML&CSS'},
            {taskId: v1(), status: true, taskTitle: 'JS&TS'},
            {taskId: v1(), status: true, taskTitle: 'React&Redux'},
            {taskId: v1(), status: false, taskTitle: 'Axios'}
        ],
        [todoListId2]: [
            {taskId: v1(), status: false, taskTitle: 'milk'},
            {taskId: v1(), status: true, taskTitle: 'bread'},
            {taskId: v1(), status: false, taskTitle: 'souse'},
            {taskId: v1(), status: true, taskTitle: 'water'}
        ]
    })

    //ф-ция по удалению тасок из массива тасок
    function removeTask(todoListId: string, taskId: string) {
        const tasks = tasksObj[todoListId]
        //метод массива filter возвращает новый массив, пропуская в него то, что будет указано в колбэк ф-ции
        tasksObj[todoListId] = tasks.filter((task) => task.taskId !== taskId)
        // ф-ция setState, которую возвращает хук useState, оповещает React когда стейт поменяется,
        // а точнее когда в него придет новый обьект, и только тогда перерисуется UI
        setTasks({...tasksObj})
    }

    function changeTaskTitle(todoListId: string, taskId: string, newTitle: string) {
        const task = tasksObj[todoListId].find((task) => task.taskId === taskId)
        if (task) {
            task.taskTitle = newTitle
            setTasks({...tasksObj})
        }
    }

    function addTask(todoListId: string, taskTitle: string) {
        const newTask: TaskType = {taskId: v1(), status: false, taskTitle}
        const tasks = tasksObj[todoListId]
        tasksObj[todoListId] = [newTask, ...tasks]
        setTasks({...tasksObj})
    }

    function changeTaskStatus(todoListId: string, taskId: string, newStatus: boolean) {
        const tasks = tasksObj[todoListId]

        const task = tasks.find((task) => task.taskId === taskId)
        if (task) {
            task.status = newStatus
            setTasks({...tasksObj})
        }
    }

    function removeTodoList(todoListId: string) {
        const filteredTodoLists = todoLists.filter((tl) => tl.todoListId !== todoListId)
        setTodoLists(filteredTodoLists)
        delete tasksObj[todoListId]
        setTasks({...tasksObj})
    }

    function changeFilter(todoListId: string, newFilter: FilterValuesType) {
        const tl = todoLists.find((tl) => tl.todoListId === todoListId)
        if (tl) {
            tl.filter = newFilter
            setTodoLists([...todoLists])
        }
    }

    function changeTodoListTitle(todoListId: string, newTitle: string) {
        const todoList = todoLists.find((tl) => tl.todoListId === todoListId)
        if (todoList) {
            todoList.todoListTitle = newTitle
            setTodoLists([...todoLists])
        }
    }

    function addTodoList(title: string) {
        const newTodoList: TodoListType = {
            todoListId: v1(),
            todoListTitle: title,
            filter: 'all'
        }
        setTodoLists([newTodoList, ...todoLists])
        setTasks({...tasksObj, [newTodoList.todoListId]: []})
    }

    return (
        <div className="App">
            <AddItemForm addItem={ addTodoList }/>
            {
                todoLists.map((tl) => {
                    let tasksForTodoList = tasksObj[tl.todoListId]

                    if (tl.filter === 'completed') {
                        tasksForTodoList = tasksObj[tl.todoListId].filter((task) => task.status)
                    } else if (tl.filter === 'active') {
                        tasksForTodoList = tasksObj[tl.todoListId].filter((task) => !task.status)
                    }

                    return (
                        <TodoList
                            key={ tl.todoListId }
                            id={ tl.todoListId }
                            todoListTitle={ tl.todoListTitle }
                            tasks={ tasksForTodoList }
                            removeTask={ removeTask }
                            filter={ tl.filter }
                            changeFilter={ changeFilter }
                            addTask={ addTask }
                            changeTaskStatus={ changeTaskStatus }
                            removeTodoList={ removeTodoList }
                            changeTaskTitle={ changeTaskTitle }
                            changeTodoListTitle={ changeTodoListTitle }
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
