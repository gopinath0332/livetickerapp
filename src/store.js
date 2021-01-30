import {
    createStore,
    applyMiddleware
} from "redux";
import thunk from "redux-thunk";
import {
    composeWithDevTools
} from "redux-devtools-extension/developmentOnly";

import reducer from "./reducer";
import storageMiddleware from "./middleware/storageMiddleware";

/**
 *  Function to configure store for Application.
 */
function AppStore() {
    return createStore(reducer, composeWithDevTools(applyMiddleware(thunk, storageMiddleware)));
}

export default AppStore;