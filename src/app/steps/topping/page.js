'use client'; 

import React, {useEffect, useState} from 'react'; 
import { supabase } from '@/app/lib/supabaseClient';

export default function Topping({toppingsCount, selectedToppings, setSelectedToppings, toppingState, setToppingState}) {
    const [toppings, setToppings] = useState([]); 

    useEffect(() => {
        async function fetchToppings() {
            let { data, error } = await supabase.from("toppings").select("*");

            if (error) 
            {
                console.error(error);
            } 
            else {
                setToppings(data); 
            }
        }
        fetchToppings();
    }, []);

    const handleToppingClick = (topping) => {
        const isSelected = selectedToppings.some(t => t.id === topping.id);

        if (isSelected) {
            setSelectedToppings(selectedToppings.filter(t => t.id !== topping.id));
        }
        else if (selectedToppings.length < toppingsCount) {
            setSelectedToppings([...selectedToppings, topping]); 
        }
        else {
            alert(`You can only select up to ${toppingsCount} toppings`); 
        }
    }

    useEffect(() => {
        if (toppingsCount === selectedToppings.length) {
            setToppingState(true); 
        }
        else {
            setToppingState(false); 
        }
    },[toppingsCount, selectedToppings, setToppingState]);


  return (  
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 justify-items-center">
        {toppings.map((item, index) => {
        const isSelected = selectedToppings.some(t => t.id === item.id);

        return (
            <div 
                key={index} 
                className="flex flex-col gap-2 items-center justify-center cursor-pointer p-1"
                onClick={() => handleToppingClick(item)}
            >
                <img 
                    src={item.photo} 
                    className={`w-32 h-32 object-cover rounded-full transition-all duration-200 ${
                        isSelected ? 'ring-4 ring-custom-yellow' : ''
                    }`}
                />
                <p className="text-sm font-semibold capitalize">{item.name}</p>
            </div>
        );
    })}
    </div>
  );
}
