import React, { ChangeEvent, useState } from 'react';

type PropsType = {
    title: string
    onTitleChange: (newTitle: string) => void
}

function EditableSpan(props: PropsType) {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.onTitleChange(title)
    }

    return (
        editMode
            ? <input value={ title } onBlur={ deactivateEditMode } onChange={ onChangeHandler } autoFocus/>
            : <span onDoubleClick={ activateEditMode }>{ props.title }</span>
    );
}

export default EditableSpan;