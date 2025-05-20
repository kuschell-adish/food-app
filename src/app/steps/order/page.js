'use client'; 

import React from 'react'; 
import { LuNut } from "react-icons/lu";

export default function Order({sizeSelectedName, toppingsSelectedNames, totalPrice}) {

  return (  
    <div>
        <div className={`grid grid-cols-1 gap-4 mt-5 text-sm`}>
            <div className={`rounded-lg transform transition-transform duration-300 border-2 border-custom-yellow`}>
                <div className="overflow-hidden">
                    <img 
                        src='https://images.unsplash.com/photo-1610441009633-b6ca9c6d4be2?q=80&w=2600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                        alt="order" 
                        className={`w-full h-[350px] rounded-t-lg object-cover ${sizeSelectedName === "medium" && 'transform scale-110'} ${sizeSelectedName === "large" && 'transform scale-125'}`}
                    />
                </div>
                <div className={`p-4`}>
                    <p className="font-semibold capitalize">{sizeSelectedName} Acai Bowl</p>
                    <p className="font-semibold text-custom-red mb-4">PHP {totalPrice.toFixed(2)}</p>
                    <p className="font-semibold">Toppings:</p>
                    {toppingsSelectedNames.map((ingredient, index) => (
                        <p key={index} className="capitalize flex items-center space-x-1"><LuNut /> <span>{ingredient.name}</span></p>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
}
