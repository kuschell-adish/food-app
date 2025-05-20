'use client'; 

import React, {useState, useEffect } from 'react'; 
import { IoIosCheckmarkCircle } from "react-icons/io";

export default function Stepper({activeStep, selectedSize, toppingState}) {
    const [doneStep, setDoneStep] = useState([]); 

    const steps = [
        { number: 1, label: "Size" },
        { number: 2, label: "Toppings" },
        { number: 3, label: "Order" },
    ];

    useEffect(() => {
        setDoneStep(prev => {
            let newDoneStep = [...prev]; 
            if (selectedSize !== null) {
                if (!newDoneStep.includes(1)) {
                    newDoneStep.push(1);
                }
            }
            if (toppingState === true && !newDoneStep.includes(2)) {
                newDoneStep.push(2);
            }
            if (toppingState === false && newDoneStep.includes(2)) {
                newDoneStep = newDoneStep.filter(step => step !== 2)
            }
            return newDoneStep; 
        });
    }, [selectedSize, toppingState]);

    return (
        <ol className="flex justify-center items-center w-full text-gray-500 text-sm">
            {steps.map((step) => (
                <li
                    key={step.number}
                    className={`flex items-center 
                    ${step.number !== 3 && `md:w-full after:content-[''] after:w-full after:h-1 after:border-b-2 after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10`}
                    ${activeStep >= step.number && 'text-custom-red font-semibold '}
                    ${activeStep > step.number && 'after:border-pink-800'}`} 
                >
                    <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200">
                        {doneStep.includes(step.number) ? (
                            <IoIosCheckmarkCircle className="me-2" />
                        ) : ( 
                            <span className="me-2">{step.number}</span>
                        )}
                            {step.label}
                    </span>
                 </li>
            ))}
        </ol>
    )
}
