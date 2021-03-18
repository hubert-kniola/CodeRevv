const initState = {
    message: "XD"
}

export const messageReducer = (state = initState, action) => {
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