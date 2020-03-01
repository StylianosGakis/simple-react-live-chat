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
                [topic]: [
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
const user = 'aaron' + Math.floor(Math.random() * 10000);

function sendChatAction(msg) {
    socket.emit("chat message", msg);
}

function Store(props) {
    const [allChats, dispatch] = useReducer(reducer, initialState, undefined);

    if (!socket) {
        socket = io(":3001");
        socket.on("chat message", (msg) => {
            dispatch({type: "RECEIVE_MESSAGE", payload: msg})
        });
    }

    return (
        <CTX.Provider value={{allChats, sendChatAction, user}}>
            {props.children}
        </CTX.Provider>
    )
}

export default Store;