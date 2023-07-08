import React from 'react';

const Button = (props) => {
    const {children, onClick, className} = props
    return (
        <div>
            <button
                className={`p-3 rounded-lg bg-pink-600 px-5 text-white ${className}`}
                onClick={onClick}
            >
                {children}
            </button>
        </div>
    );
};

export default Button;