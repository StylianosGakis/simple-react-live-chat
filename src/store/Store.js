import React, {useReducer} from 'react';
import io from 'socket.io-client'

export const CTX = React.createContext();

const initialState = {
    general: [
        {
            from: "ME",
            msg: "Msg1"
        },
        {
            from: "ME",
            msg: "Msg2"
        }
    ],
    topic2: [
        {
            from: "Topic2Guy",
            msg: "Some topic stuff"
        }
    ]
};

function reducer(state, action) {
    const {from, msg, topic} = action.payload;

    switch (action.type) {
        case "RECEIVE_MESSAGE":
            return {
                ...state,
                topic: [
                    ...state[topic],
                    {
                        from: from,
                        msg: msg,
                    }
                ]
            };
        default:
            return state
    }
}

let socket;

function sendChatAction(value) {
    socket.emit("chat message", value);
}

function Store(props) {
    if (!socket) {
        socket = io(":3001");
    }

    const [allChats] = useReducer(reducer, initialState, undefined);
    return (
        <CTX.Provider value={{allChats, sendChatAction}}>
            {props.children}
        </CTX.Provider>
    )
}

export default Store;