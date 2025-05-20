'use client'; 

import React, {useState, useEffect} from 'react'; 
import { supabase } from '@/app/lib/supabaseClient';

import { LuNut } from "react-icons/lu";

export default function Size({selectedSize, setSelectedSize}) {
    const [sizes, setSizes] = useState([]); 
    const staticDescriptions = {
        small: 'Perfect for light, healthy snack!',
        medium: 'A satisfying and energizing option!',
        large: 'For the ultimate acai indulgence!',
    };
    const staticRecipes = {
        small: [
          'one scoop of acai base',
          'three fresh toppings',
          'one drizzle of peanut butter',
        ],
        medium: [
          'two scoops of acai base',
          'four fresh toppings',
          'one drizzle of peanut butter',
        ],
        large: [
          'three scoops of acai base',
          'five fresh toppings',
          'one drizzle of peanut butter',
        ],
      };
    
    useEffect(() => {
        async function fetchSizes() {
            let { data, error } = await supabase.from("sizes").select("*");

            if (error) {
                console.error(error);
            } 
            else {
                const sizes = data.map((size) => ({
                    ...size,
                    description: staticDescriptions[size.name],
                    recipe: staticRecipes[size.name],
                }));
                setSizes(sizes); 
            }
        }
        fetchSizes();

      }, []);

    const handleSizeClick = (size) => {
        setSelectedSize(size); 
    }

  return (  
    <div>
        <div className={`grid grid-cols-1 gap-4 text-sm mt-5 sm:grid-cols-3`}>
            {sizes.map((item, index) => (
                    <div key={index}
                        className={`cursor-pointer rounded-lg transform transition-transform duration-300 
                            ${index !== 0 && 'overflow-hidden'}
                            ${item.id === selectedSize?.id ? 'border-2 border-custom-yellow' : 'hover:border border-custom-yellow'}
                        `}
                        onClick={() => handleSizeClick(item)}
                    >
                        <div className="overflow-hidden">
                            <img 
                                src='https://images.unsplash.com/photo-1610441009633-b6ca9c6d4be2?q=80&w=2600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                                alt="food" 
                                className={`w-full h-[350px] rounded-t-lg object-cover ${index === 1 && 'transform scale-110'} ${index === 2 && 'transform scale-125'}`}
                            />
                        </div>
                        <div className={`p-4`}>
                            <p className="font-semibold capitalize">{item.name} Acai Bowl</p>
                            <p className="font-light italic text-sm">{item.description}</p>
                            <p className="font-semibold text-custom-red mb-4">PHP {item.price.toFixed(2)}</p>
                            <p className="font-semibold">Includes:</p>
                            {item.recipe.map((ingredient, index) => (
                                <p key={index} className="flex items-center space-x-1"><LuNut /> <span>{ingredient}</span></p>
                            ))}
                        </div>
                    </div>
                ))}
        </div>
    </div>
  );
}
