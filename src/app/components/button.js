'use client'; 

import React from 'react'; 

export default function Button({type="button", label, onClick, isDisabled, className}) {
    return (
        <button 
            type={type}
            className={`text-white text-sm bg-custom-red rounded-lg px-5 py-2.5 my-5 ${isDisabled ? 'disabled:bg-gray-300 disabled:cursor-not-allowed' : ''} ${className}`}
            onClick={onClick}
            disabled={isDisabled}
        >
            {label}
        </button>
    )
}
