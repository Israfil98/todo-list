import React, { useState } from 'react';
import { v1 } from 'uuid';

import './App.css';

import TodoList from './components/TodoList/TodoList';

//типизируем обьект Task, для того чтобы не ошибиться в написании св-в и не пропустить один из них
export type TaskType = {
    status: boolean
    taskId: string
    taskTitle: string
}
export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {
    //создаем наш псевдо стейт, которые будем передавать в TodoList компоненту в качестве пропсов
    //так же указываем нужный тип данных стейта
    //засовываем наш стейт в хук useState, для того чтобы реакт мог понимать когда ему перерисовывать UI
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {taskId: v1(), status: true, taskTitle: 'HTML&CSS'},
        {taskId: v1(), status: true, taskTitle: 'JS&TS'},
        {taskId: v1(), status: true, taskTitle: 'React&Redux'},
        {taskId: v1(), status: false, taskTitle: 'Axios'}
    ])
    const [filter, setFilter] = useState<FilterValuesType>('all')

    //ф-ция по удалению тасок из массива тасок
    function removeTask(taskId: string) {
        //метод массива filter возвращает новый массив, пропуская в него то, что будет указано в колбэк ф-ции
        const resultTasks = tasks.filter((task) => task.taskId !== taskId)
        // ф-ция setState, которую возвращает хук useState, оповещает React когда стейт поменяется,
        // а точнее когда в него придет новый обьект, и только тогда перерисуется UI
        setTasks(resultTasks)
    }

    function addTask(taskTitle: string) {
        const newTask: TaskType = {taskId: v1(), status: false, taskTitle}
        setTasks([newTask, ...tasks])
    }

    let tasksForTodoList = tasks
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter((task) => task.status)
    } else if (filter === 'active') {
        tasksForTodoList = tasks.filter((task) => !task.status)
    }

    function changeFilter(newFilter: FilterValuesType) {
        setFilter(newFilter)
    }

    return (
        <div className="App">
            <TodoList
                todoListTitle='What to learn'
                tasks={ tasksForTodoList }
                filter={ filter }
                changeFilter={ changeFilter }
                removeTask={ removeTask }
                addTask={ addTask }
            />
        </div>
    );
}

export default App;
