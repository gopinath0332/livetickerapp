import {
    ACTION_TYPES
} from "../action";

const initialState = {
    showLoader: true,
    connectionStatus: null,
    books: [],
    sellBooks: [],
    message: ""
}

/**
 *  Application reducer to handle bids data and application store.
 * @param {*} state 
 * @param {*} action 
 */
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_DATA:
        case ACTION_TYPES.BEGIN_CONNECTION:
            return {
                ...state,
                showLoader: true,
                connectionEnabled: false
            };

        case ACTION_TYPES.CONNECTION_ESTABLISHED:
            return {
                ...state,
                showLoader: true,
                connectionEnabled: "success",
                message: ""
            }


        case ACTION_TYPES.CONNECTION_FAILED:
            return {
                ...state,
                showLoader: false,
                connectionEnabled: "failed"
            }
        default:
            return {
                ...state
            }
    }
};

export default reducer;