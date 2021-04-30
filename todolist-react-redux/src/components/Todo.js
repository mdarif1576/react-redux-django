import React from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { useState } from 'react';



function Todo(props) {

    const { item, index, markComplete, deleteTodo } = props

    const [showModal, setShowModal] = useState(false)

    const handleChange = (index) => {
        markComplete(index)

    }
    const handleDelete = (index) => {
        deleteTodo(index)
    }

    const handleOpenModal = () => {
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }


    return (
        <div>
            <div style={item.todoDate > new Date() ? { border: "2px solid blue", marginTop: "10px", padding: "5px", width: '70%', marginLeft: "15%" } : { border: "2px solid red", marginTop: "5px", padding: "5px", width: '70%', marginLeft: "15%" }}>
                <input type="checkbox" checked={item.isCompleted} onChange={() => handleChange(index)} id="checkbox" />
                <button onClick={() => handleOpenModal()} id="buttonExpand">+</button>
                <div >
                &nbsp;  <span id="todoDisplay" style={item.isCompleted ? { textDecoration: "line-through" } : { textDecoration: "none" }} >{item.todoName} &nbsp; {item.todoDate > new Date() ? '' : <span style={{ color: 'red' }}>(Due)</span>}</span>
                    <Modal isOpen={showModal} contentLabel="onRequestClose Example" onRequestClose={() => handleCloseModal()} className="Modal" overlayClassName="Overlay" ariaHideApp={false}>
                        <>
                            <button onClick={() => handleCloseModal()} style={{ textAlign: 'center', float: 'right' }} id="buttonDel">X</button>
                            <div style={{ margin: "10px 10px 10px 20px" }}>
                                <b>Todo Description: </b> {item.todoName} <br /> <br />
                                <b>Todo Expected Date of completion: </b> {item.todoDate.toString()} <br /> <br />
                                <b>Todo Status: </b> {item.todoDate > new Date() ? 'Active' : <span style={{ color: 'red' }}>(Due)</span>}
                            </div>
                        </>
                    </Modal>
                    <button onClick={() => handleDelete(index)} id="buttonDel">x</button>
                </div>

            </div>
        </div>
    )
}


const mapDispatchToProps = dispatch => {
    return {

        markComplete: (val) => { dispatch({ type: 'MARK_COMPLETE', payload: val }) },
        deleteTodo: (val) => { dispatch({ type: 'DELETE_TODO', payload: val }) }

    }

}

export default connect(null, mapDispatchToProps)(Todo)
