import React, { useEffect, useRef, useState } from "react";

const Timer = () => {
    const inputRef = useRef();
    useEffect(() => {
        if (inputRef) inputRef.current.focus();
    }, []);
    return (
        <div className="div-input">
            <input
                type="text"
                placeholder="forcus"
                className="border border-blue-400 p-2"
                ref={inputRef}
            />
        </div>
    );
};

export default Timer;
