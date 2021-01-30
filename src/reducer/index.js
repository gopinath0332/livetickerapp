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

const maxLength = 20;

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
        case ACTION_TYPES.ADD_BOOKS: {
            let books = state.books.map(item => ({ ...item }));
            if (action.data.length > maxLength) {
                books = action.data.splice(action.data.length - maxLength, maxLength);
            } else if (books.length >= maxLength) {
                books.shift();
                books = books.concat(action.data);
            } else {
                books = [...books, ...action.data]
            }
            return {
                ...state,
                books
            }
        }
        case ACTION_TYPES.ADD_SELL_BOOKS: {
            let sellBooks = state.sellBooks.map(item => ({ ...item }));
            if (action.data.length > maxLength) {
                sellBooks = action.data.splice(action.data.length - maxLength, maxLength);
            } else if (sellBooks.length >= maxLength) {
                sellBooks.shift();
                sellBooks = sellBooks.concat(action.data);
            } else {
                sellBooks = [...sellBooks, ...action.data]
            }
            return {
                ...state,
                sellBooks
            }
        }
        default:
            return {
                ...state
            }
    }
};

export default reducer;