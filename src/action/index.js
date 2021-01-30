import { w3cwebsocket as W3CWebSocket } from "websocket";
import { v4 as uuidv4 } from 'uuid';



/**
 *  Application Action types.
 */
export const ACTION_TYPES = {
    FETCH_DATA: "FETCH_DATA",
    BEGIN_CONNECTION: "BEGIN_CONNECTION",
    CONNECTION_ESTABLISHED: "CONNECTION_ESTABLISHED",
    CONNECTION_FAILED: "CONNECTION_FAILED",
    CONNECTION_FAIL_REASON: "CONNECTION_FAIL_REASON",
    ADD_BOOKS: "ADD_BOOKS",
    ADD_SELL_BOOKS: "ADD_SELL_BOOKS"
}

const payload = {
    "event": "subscribe",
    "channel": "book",
    "symbol": "tBTCUSD"
}

export const beingTransaction = () => dispatch => {
    dispatch({
        type: ACTION_TYPES.BEGIN_CONNECTION
    });
    const client = new W3CWebSocket('wss://api-pub.bitfinex.com/ws/2');

    client.onerror = () => {
        console.log(" Websocket connection failed.");
        dispatch({
            type: ACTION_TYPES.CONNECTION_FAILED
        });
    };

    client.onopen = () => {
        console.log('WebSocket Connection success');
        dispatch({
            type: ACTION_TYPES.CONNECTION_ESTABLISHED
        });

        // Send query verb to start connection values.
        client.send(JSON.stringify(payload));
    };

    client.onclose = (evt) => {
        if (evt.code !== 1000) {
            // try to make connection if connection is not closed properly.
            dispatch(beingTransaction());

            if (!navigator.onLine) {
                dispatch({
                    type: ACTION_TYPES.CONNECTION_FAIL_REASON,
                    data: "You are offline. Please connect to the Internet and try again."
                });
            }
        }
    };

    client.onmessage = evt => {
        const response = JSON.parse(evt.data);
        if (Array.isArray(response)) {
            const [channelId, data] = response;
            const { books, sellBooks } = getFormattedData(data);
            (books.length > 0) && dispatch(addBooks(books));
            (sellBooks.length > 0) && dispatch(addSellBooks(sellBooks));
        }
    }
    return client;
}

const getFormatedNumber = data => {
    return Math.abs(+Number.parseFloat(data).toFixed(4));
}

const getFormattedData = (data) => {
    const books = [];
    const sellBooks = []
    if (data.length > 3) {
        data.map(item => {
            const [price, count, amount] = item;
            if (amount < 0) {
                sellBooks.push({
                    price,
                    count,
                    amount: getFormatedNumber(amount),
                    id: uuidv4(),
                    total: getFormatedNumber(count * amount)
                });
            } else {
                books.push({
                    price,
                    count,
                    amount: getFormatedNumber(amount),
                    id: uuidv4(),
                    total: getFormatedNumber(count * amount)
                });
            }
        });
    } else {
        const [price, count, amount] = data;
        if (amount < 0) {
            sellBooks.push({
                price,
                count,
                amount: getFormatedNumber(amount),
                id: uuidv4(),
                total: getFormatedNumber(count * amount)
            });
        } else {
            books.push({
                price,
                count,
                amount: getFormatedNumber(amount),
                id: uuidv4(),
                total: getFormatedNumber(count * amount)
            });
        }
    }
    return { books, sellBooks };
}

export const addBooks = data => ({
    type: ACTION_TYPES.ADD_BOOKS,
    data
})

export const addSellBooks = data => ({
    type: ACTION_TYPES.ADD_SELL_BOOKS,
    data
});