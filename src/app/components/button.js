'use client'; 

import React from 'react'; 

export default function Button({label, onClick, isDisabled}) {
    return (
        <button 
            type="button" 
            className={`text-white text-sm bg-custom-red rounded-lg px-5 py-2.5 my-10 ${isDisabled && 'disabled:bg-gray-300 disabled:cursor-not-allowed'}`}
            onClick={onClick}
            disabled={isDisabled}
        >
            {label}
        </button>
    )
}
