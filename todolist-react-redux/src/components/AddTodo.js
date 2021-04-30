import React, { useState } from 'react'
import { connect } from 'react-redux'
import TodoList from './TodoList'

function AddTodo(props) {

    const { addName } = props
    const [todoName, setTodoName] = useState('')
    const [taskDate, setTaskDate] = useState('')


    const handleClick = () => {
        if (todoName && taskDate !== '') {
            addName({ todo: todoName, date: new Date(`${taskDate} 23:59:59`) })
            setTodoName('')
            setTaskDate('')
        }
    }


    const handleLogout = () => {
        props.history.push('/')

    }

    return (
        <>
            <div>
                <h3 style={{float:'left', marginLeft:'10px'}}>Welcome {props.match.params.name}</h3>
                <button onClick={() => handleLogout()} id="buttonLog">Logout</button>
            </div>

            <div style={{marginTop:'20px', textAlign: 'center', marginLeft: "10px" }}>
                <label>Todo Name: </label><input type="text" value={todoName} onChange={(evt) => setTodoName(evt.target.value)} id="todo" /> &nbsp;
                <label>Date of completion: </label><input type="date" value={taskDate} onChange={(evt) => setTaskDate(evt.target.value)} id="todo" /> &nbsp;
                <button onClick={() => handleClick()} id="buttonAdd">+</button> &nbsp;

            </div>
            <TodoList />
        </>
    )
}


const mapDispatchToProps = dispatch => {
    return {
        addName: (val) => { dispatch({ type: 'ADD_TODO', payload: val }) },
    }

}

export default connect(null, mapDispatchToProps)(AddTodo)


