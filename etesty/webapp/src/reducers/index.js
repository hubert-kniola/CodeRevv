const initState = {
    message: "XD",
    other: []
}

export const rootReducer = (state = initState, action) => {
    const result = messageReducer(state, action);

    return {
        ...result
    }
}

const messageReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE': {
            return {
                ...state,
                message: `${state.message}~`
            }
        }
        default: { return state }
    }
}