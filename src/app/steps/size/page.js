'use client'; 

import React from 'react'; 
import { LuNut } from "react-icons/lu";

export default function Size({setSize, setName, setPrice, setToppings, selectedSize}) {
    const foodSizes = [
        {
            size: 'Small', 
            description: 'Perfect for light, healthy snack!', 
            price: 150,
            recipe: [
                'one scoop of acai base',
                'three fresh toppings',
                'one drizzle of peanut butter'
            ],
            toppings: 3
        },
        {
            size: 'Medium', 
            description: 'A satisfying and energizing option!', 
            price: 250,
            recipe: [
                'two scoops of acai base',
                'four fresh toppings',
                'one drizzle of peanut butter'
            ],
            toppings: 4
        },
        {
            size: 'Large', 
            description: 'For the ultimate acai indulgence!', 
            price: 350,
            recipe: [
                'three scoops of acai base',
                'five fresh toppings',
                'one drizzle of peanut butter'
            ],
            toppings: 5
        },
    ]

    const handleSizeClick = (index) => {
        setSize(index);
        setName(foodSizes[index].size); 
        setPrice(foodSizes[index].price); 
        setToppings(foodSizes[index].toppings);
    }

  return (  
    <div>
        <div className={`grid grid-cols-1 gap-4 text-sm mt-5 sm:grid-cols-3`}>
            {foodSizes.map((food, index) => (
                    <div key={index}
                        className={`cursor-pointer rounded-lg transform transition-transform duration-300 
                            ${index !== 0 && 'overflow-hidden'}
                            ${index === selectedSize ? 'border-2 border-custom-yellow' : 'hover:border border-custom-yellow'}
                        `}
                        onClick={() => handleSizeClick(index)}
                    >
                        <div className="overflow-hidden">
                            <img 
                                src='https://images.unsplash.com/photo-1610441009633-b6ca9c6d4be2?q=80&w=2600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                                alt="food" 
                                className={`w-full h-[350px] rounded-t-lg object-cover ${index === 1 && 'transform scale-110'} ${index === 2 && 'transform scale-125'}`}
                            />
                        </div>
                        <div className={`p-4`}>
                            <p className="font-semibold">{food.size} Acai Bowl</p>
                            <p className="font-light italic text-sm">{food.description}</p>
                            <p className="font-semibold text-custom-red mb-4">PHP {food.price.toFixed(2)}</p>
                            <p className="font-semibold">Includes:</p>
                            {food.recipe.map((ingredient, index) => (
                                <p key={index} className="flex items-center space-x-1"><LuNut /> <span>{ingredient}</span></p>
                            ))}
                        </div>
                    </div>
                ))}
        </div>
    </div>
  );
}
