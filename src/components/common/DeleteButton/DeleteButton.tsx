import React from 'react';
import { Delete } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

type PropsType = {
    deleteCallback: () => void
}

function DeleteButton(props: PropsType) {
    return (
        <IconButton aria-label='delete'>
            <Delete onClick={ props.deleteCallback }/>
        </IconButton>
    );
}

export default DeleteButton;