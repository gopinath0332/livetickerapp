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
    ADD_BIDS: "ADD_BIDS",
    UPDATE_BIDS: "UPDATE_BIDS",
    RESET_BIDS: "RESET_BIDS"
}

const payload = {
    "event": "subscribe",
    "channel": "book",
    "symbol": "tBTCUSD"
}