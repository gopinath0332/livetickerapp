import { ACTION_TYPES, addBooks, addSellBooks } from "../action";

const appStorageKey = "liveticker";

/**
 * 
 * Middleware to store bids data to localStorage.
 * Middleware process only ACTION_TYPES.ADD_BIDS action and stores data
 */
const storageMiddleware = store => next => action => {
    const result = next(action);
    if (action.type === ACTION_TYPES.ADD_BOOKS || action.type === ACTION_TYPES.ADD_SELL_BOOKS) {
        const storeData = store.getState();
        // store updated store data to localstorage.
        window.localStorage.setItem(appStorageKey, JSON.stringify({ books: storeData.books, sellBooks: storeData.sellBooks }));
    } else if (action.type === ACTION_TYPES.BEGIN_CONNECTION) {
        const { books = [], sellBooks = [] } = JSON.parse(window.localStorage.getItem(appStorageKey)) || {};
        //fetch data from localstorate and push to redux store.
        (books.length > 0) && store.dispatch(addBooks(books));
        (sellBooks.length > 0) && store.dispatch(addSellBooks(sellBooks));
    }
    return result;
};

export default storageMiddleware;