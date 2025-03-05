'use client'; 

import React, {useEffect} from 'react'; 

export default function Topping({toppingsCount, setEqualValue, selectedToppings, setSelectedToppings}) {

    const fruits = [
        {
            image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?q=80&w=2268&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
            name: 'Bananas', 
        },
        {
            image: 'https://images.pexels.com/photos/3691116/pexels-photo-3691116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 
            name: 'Dragon Fruit', 

        },
        {
            image: 'https://images.pexels.com/photos/849685/pexels-photo-849685.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 
            name: 'Kiwi', 

        }
    ];

    const berries = [
        {
            image: 'https://images.unsplash.com/photo-1587393855524-087f83d95bc9?q=80&w=2206&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
            name: 'Strawberries', 

        },
        {
            image: 'https://images.pexels.com/photos/2539177/pexels-photo-2539177.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 
            name: 'Blueberries', 

        },
        {
            image: 'https://images.pexels.com/photos/6087131/pexels-photo-6087131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 
            name: 'Black Berries', 

        },
        {
            image: 'https://plus.unsplash.com/premium_photo-1726750965893-5b44ef63adc9?q=80&w=3088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
            name: 'Goji Berries', 

        }
    ];

    const nuts = [
        {
            image: 'https://images.pexels.com/photos/3872382/pexels-photo-3872382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 
            name: 'Granola', 
        },
        {
            image: 'https://plus.unsplash.com/premium_photo-1671130295917-be0cde58cf23?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
            name: 'Chia Seeds', 

        },
        {
            image: 'https://images.unsplash.com/photo-1693812879904-b8161644ce5a?q=80&w=3051&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
            name: 'Mixed Nuts', 

        },
        {
            image: 'https://plus.unsplash.com/premium_photo-1675237625910-e5d354c03987?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
            name: 'Almond', 

        },
        {
            image: 'https://images.pexels.com/photos/6157093/pexels-photo-6157093.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 
            name: 'Coconut Flakes', 

        },
    ];

    const sweeteners = [
        {
            image: 'https://images.unsplash.com/photo-1585502866757-30ae9e509e31?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
            name: 'Chocolate Chips', 

        },
        {
            image: 'https://images.pexels.com/photos/6659881/pexels-photo-6659881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 
            name: 'Peanut Butter', 

        },
        {
            image: 'https://images.pexels.com/photos/4110096/pexels-photo-4110096.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 
            name: 'Cacao Nibs', 

        },
    ]

    const foodToppings = [
        { category: 'Sliced Fruits', items: fruits },
        { category: 'Fresh Berries', items: berries },
        { category: 'Nuts and Seeds', items: nuts },
        { category: 'Sweet Additives', items: sweeteners }
    ];


    const handleToppingClick = (categoryIndex, itemIndex) => {
        const isSelected = selectedToppings.some(
            (topping) => topping.categoryIndex === categoryIndex && topping.itemIndex === itemIndex
        );

        const toppingName = foodToppings[categoryIndex].items[itemIndex].name;

        if (isSelected) {
            setSelectedToppings((prevToppings) =>
                prevToppings.filter(
                    (topping) => topping.categoryIndex !== categoryIndex || topping.itemIndex !== itemIndex
                )
            );
        } else {
            if (selectedToppings.length < toppingsCount) {
                setSelectedToppings((prevToppings) => [
                    ...prevToppings,
                    { categoryIndex, itemIndex, name: toppingName },
                ]);
            } else {
                alert(`You can only select up to ${toppingsCount} toppings.`);
            }
        }
    };

    useEffect(() => {
        if (selectedToppings.length === toppingsCount) {
            setEqualValue(true);
        }
        else {
            setEqualValue(false); 
        }
      }, [selectedToppings, toppingsCount]);

  return (  
    <div>
        {foodToppings.map((foodCategory,categoryIndex) => (
            <div key ={categoryIndex} className="my-5">
                <p className="font-semibold text-sm mb-2 text-custom-red">{foodCategory.category}</p>
                <div className="grid grid-cols-2 sm:grid-cols-8 gap-4 text-sm">
                    {foodCategory.items.map((food, itemIndex) => (
                        <div key={itemIndex}
                        className={`rounded-lg transform transition-transform duration-300 cursor-pointer
                            ${selectedToppings.some(
                                (topping) =>
                                    topping.categoryIndex === categoryIndex && topping.itemIndex === itemIndex
                            )
                                ? 'border-2 border-custom-yellow'
                                : 'hover:border border-custom-yellow'}
                        `}
                        onClick={() => handleToppingClick(categoryIndex, itemIndex)}
                        >
                            <div className="w-full overflow-hidden">
                                <img 
                                    src={food.image} 
                                    alt="food" 
                                    className={`w-full h-[200px] rounded-t-lg object-cover}`}
                                />
                                <p className="font-semibold py-2 px-1">{food.name} </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </div>
  );
}
