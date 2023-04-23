import React, { useContext } from "react";
import PropTypes from "prop-types";
import Context from "../context";

const styles = {
    li: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '.5rem 1rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginBottom: '.5rem'
    },
    input: {
        marginRight: '1rem'
    }
}

function TodoItem ({task, index, onChange}) {
    const classes = []

    const { removeTask } = useContext(Context)

    if (task.completed) {
        classes.push('done')
    }

    return (
        <li style = {styles.li}>
            <span className={classes.join(' ')}>
                <input
                    type='checkbox'
                    checked={task.completed}
                    style={styles.input}
                    onChange={ () => onChange(task.id) }/>
                <strong>{index + 1}</strong>
                &nbsp;
                {task.title}
            </span>

            <button className='rm' onClick={removeTask.bind(null, task.id)}>&times;</button>
        </li>
    )

}

TodoItem.propTypes = {
    task: PropTypes.object.isRequired,
    index: PropTypes.number,
    onChange: PropTypes.func.isRequired
}

export default TodoItem