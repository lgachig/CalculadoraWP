"use client";

import { useReducer } from "react";

type State = {
    display: string;
};

type Action =
    | { type: "ADD_CHAR"; payload: string }
    | { type: "CLEAR" }
    | { type: "EVALUATE" };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "ADD_CHAR":
            return { display: state.display + action.payload };

        case "CLEAR":
            return { display: "" };

        case "EVALUATE":
            try {
                return {  display: eval(state.display).toString() };
            } catch {
                return {display: "Error" };
            }

        default:
            return state;
    }
}

export default function Calculador() {

    const buttons = [
        "7", "8", "9", "/",
        "4", "5", "6", "*",
        "1", "2", "3", "-",
        "0", ".", "=", "+"
    ];

    const [state, dispatch] = useReducer(reducer, { display: "" });

    return (
        <div
            className="card"
            style={{
                width: "15rem",
                margin: "auto",
                marginTop: "2rem",
                padding: "1rem",
            }}
        >
            <input
                type="text"
                className="form-control mb-3"
                value={state.display}
                readOnly
            />
            <div className="container text-center">
                <div className="row row-cols-4">
                    {buttons.map((b) => (
                        <NumberBtn
                            key={b}
                            value={b}
                            dispatch={dispatch}
                        />
                    ))}
                </div>
            </div>

            <button
                className="btn btn-danger mt-3"
                onClick={() => dispatch({ type: "CLEAR" })}
            >
                C
            </button>
        </div>
    );
}

type NumberProps = {
    value: string;
    dispatch: React.Dispatch<Action>;
};

export function NumberBtn({ value, dispatch }: NumberProps) {

    function handleClick() {
        if (value === "=") {
            dispatch({ type: "EVALUATE" });
        } else {
            dispatch({ type: "ADD_CHAR", payload: value });
        }
    }

    return (
        <div className="col" style={{ marginBottom: "0.5rem" }}>
            <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClick}
            >
                {value}
            </button>
        </div>
    );
}