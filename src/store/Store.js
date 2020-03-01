import React, {useReducer} from 'react';
import io from 'socket.io-client'

export const CTX = React.createContext(undefined);

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

function Store(props) {
    if (!socket) {
        socket = io(":3001");
    }

    const reducerHook = useReducer(reducer, initialState, undefined);
    return (
        <CTX.Provider value={reducerHook}>
            {props.children}
        </CTX.Provider>
    )
}

export default Store;