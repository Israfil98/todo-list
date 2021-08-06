import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

type PropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: PropsType) {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const onTaskTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }
    const onNewTaskAddHandler = () => {
        if (title.trim() !== '') {
            props.addItem(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.ctrlKey && e.charCode === 13) {
            onNewTaskAddHandler()
        }
        setError(null)
    }

    return (
        <div>
            <input className={ error ? 'error' : '' } placeholder='Enter title' value={ title }
                   onChange={ onTaskTitleChangeHandler } onKeyPress={ onKeyPressHandler }/>
            <button onClick={ onNewTaskAddHandler }>+</button>
            { error && <div className='error-message'>{ error }</div> }
        </div>
    );
}

export default AddItemForm;