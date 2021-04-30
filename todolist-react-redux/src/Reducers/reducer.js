function reducer(state = {}, action) {

    switch (action.type) {

        case 'ADD_TODO': {
            return { ...state, data: [...state.data, { todoName: action.payload.todo, todoDate: action.payload.date, isCompleted: false }] }
        }

        case 'MARK_COMPLETE': {

            let index = action.payload
            return { ...state, data: [...state.data.slice(0, index), { ...state.data[index], isCompleted: !state.data[index].isCompleted }, ...state.data.slice(index + 1)] }

        }

        case 'DELETE_TODO': {

            let index = action.payload
            return { ...state, data: [...state.data.slice(0, index), ...state.data.slice(index + 1)] }

        }

        default: {
            return state
        }

    }
}

export default reducer
