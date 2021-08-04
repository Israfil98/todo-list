import React from 'react';

import './App.css';

import TodoList from './components/TodoList/TodoList';

//типизируем обьект Task, для того чтобы не ошибиться в написании св-в и не пропустить один из них
export type TaskType = {
    status: boolean
    taskId: number
    taskTitle: string
}

function App() {
    //создаем наш псевдо стейт, которые будем передавать в TodoList компоненту в качестве пропсов
    //так же указываем нужный тип данных стейта
    const tasks1: Array<TaskType> = [
        {taskId: 1, status: true, taskTitle: 'HTML&CSS'},
        {taskId: 2, status: true, taskTitle: 'JS&TS'},
        {taskId: 3, status: true, taskTitle: 'React&Redux'},
    ]
    const tasks2: Array<TaskType> = [
        {taskId: 4, status: false, taskTitle: 'Vue'},
        {taskId: 5, status: false, taskTitle: 'Angular'},
        {taskId: 6, status: false, taskTitle: 'MobX'},
    ]

    return (
        <div className="App">
            <TodoList todoListTitle='What to learn' tasks={ tasks1 }/>
            <TodoList todoListTitle='What to buy' tasks={ tasks2 }/>
        </div>
    );
}

export default App;
