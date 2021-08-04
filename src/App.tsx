import React, { useState } from 'react';

import './App.css';

import TodoList from './components/TodoList/TodoList';

//типизируем обьект Task, для того чтобы не ошибиться в написании св-в и не пропустить один из них
export type TaskType = {
    status: boolean
    taskId: number
    taskTitle: string
}
export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {
    //создаем наш псевдо стейт, которые будем передавать в TodoList компоненту в качестве пропсов
    //так же указываем нужный тип данных стейта
    //засовываем наш стейт в хук useState, для того чтобы реакт мог понимать когда ему перерисовывать UI
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {taskId: 1, status: true, taskTitle: 'HTML&CSS'},
        {taskId: 2, status: true, taskTitle: 'JS&TS'},
        {taskId: 3, status: true, taskTitle: 'React&Redux'},
        {taskId: 4, status: false, taskTitle: 'Axios'}
    ])
    const [filter, setFilter] = useState<FilterValuesType>('all')

    //ф-ция по удалению тасок из массива тасок
    function removeTask(taskId: number) {
        //метод массива filter возвращает новый массив, пропуская в него то, что будет указано в колбэк ф-ции
        const resultTasks = tasks.filter((task) => task.taskId !== taskId)
        // ф-ция setState, которую возвращает хук useState, оповещает React когда стейт поменяется,
        // а точнее когда в него придет новый обьект, и только тогда перерисуется UI
        setTasks(resultTasks)
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
                removeTask={ removeTask }
                filter={ filter }
                changeFilter={ changeFilter }
            />
        </div>
    );
}

export default App;
