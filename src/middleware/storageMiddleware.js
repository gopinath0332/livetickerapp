import {
    ACTION_TYPES,
} from "../action";

const appStorageKey = "liveticker";

/**
 * 
 * Middleware to store bids data to localStorage.
 * Middleware process only ACTION_TYPES.ADD_BIDS action and stores data
 */
const storageMiddleware = store => next => action => {
    const result = next(action);
    /*if (action.type === ACTION_TYPES.ADD_BIDS) {
        const storeData = store.getState();
        window.localStorage.setItem(appStorageKey, JSON.stringify(storeData.bids));
        if (storeData.bids.length > 20) {
            // store.dispatch(resetBids(10));
        }
    } else if (action.type === ACTION_TYPES.CONNECTION_ESTABLISHED) {
        const bids = JSON.parse(window.localStorage.getItem(appStorageKey)) || [];
        // Load data from storage to store.
        // (bids.length > 0) && store.dispatch(updateBids(bids.splice(0, 20)));
    }*/
    return result;
};

export default storageMiddleware;