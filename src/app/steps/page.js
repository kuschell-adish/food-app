'use client'; 

import React, {useState} from 'react'; 
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import axios from 'axios';

import Stepper from '../components/stepper';
import Button from '../components/button';

import Size from './size/page';
import Topping from './topping/page';
import Order from './order/page';

export default function Page() {

    const router = useRouter();

    const [size, setSize] = useState(null);
    const [name, setName] = useState(null);
    const [price, setPrice] = useState(0);

    const [toppings, setToppings] = useState(0);
    const [toppingSet, setToppingSet] = useState(false);
    const [selectedToppings, setSelectedToppings] = useState([]);

    const [activeStep, setActiveStep] = useState(1); 
    const handleNext = () => {
        setIsNextClicked(true); 

        setTimeout(() => {
            setActiveStep((prev) => prev + 1); 
            setIsNextClicked(false); 
        }, 300); 
        
    };
    const handlePrevious = () => {
        setIsPreviousClicked(true); 

        setTimeout(() => {
            setActiveStep(prevStep => Math.max(prevStep - 1, 1));  
            setIsPreviousClicked(false); 
        }, 300);
        
    };

    const isSizeButtonDisabled = () => {
        return size === null; 
    }

    const isToppingButtonDisabled = () => {
        return selectedToppings.length === 0; 
    }

    const [isNextClicked, setIsNextClicked] = useState(false); 
    const [isPreviousClicked, setIsPreviousClicked] = useState(false); 
    const [isConfirmClicked, setIsConfirmClicked] = useState(false); 

    const date = new Date();
    const formattedDate = format(date, 'MMMM dd, yyyy hh:mm a');

    const generateOrderNumber = () => {
        return Math.floor(Math.random() * 900) + 100;
    };
    const orderNumber = generateOrderNumber();
    
    const orderData = {
        orderNumber: orderNumber,
        size: name, 
        toppings: selectedToppings,
        price: price,
        date: formattedDate
    }

    const handleConfirm = async(e) => {
        e.preventDefault();
        setIsConfirmClicked(true); 

        try {
            const response = await axios.post('/api/orders', orderData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 201) { 
                console.log("successful", response.data);
    
                setTimeout(() => {
                    router.push(`/steps/confirm?orderNumber=${orderNumber}`);
                    setIsConfirmClicked(false); 
                }, 300);
            } else {
                console.log("error posting data:", response.data.error);
                setIsConfirmClicked(false); 
            }
        } catch (err) {
            console.log("error posting data:", err.message);
        }
      };
    

  return (  
    <div className={`w-full max-h-screen overflow-hidden align-center p-10 transition-all duration-300 ease-in-out ${isConfirmClicked && '-translate-x-full'}`}>
       <Stepper 
            selectedSize={size} 
            sizeName={name}
            activeStep = {activeStep}
            setActiveStep = {setActiveStep}
            toppingSet={toppingSet}

      />
        <div className={`w-full max-h-[80vh] sm:max-h-[70vh] overflow-y-auto transition-all duration-300 ease-in-out ${isNextClicked && '-translate-x-full'} ${isPreviousClicked && 'translate-x-full'}`}>
        {activeStep === 1 ? (
            <Size
                setSize={setSize} 
                setName = {setName}
                setPrice = {setPrice}
                setToppings = {setToppings}
                selectedSize = {size}
            />
        ): activeStep === 2 ? (
            <Topping
                toppingsCount={toppings}
                setEqualValue = {setToppingSet} 
                selectedToppings = {selectedToppings}
                setSelectedToppings = {setSelectedToppings}
            />
        ) : (
            <Order 
                sizeSelectedName = {name}
                toppingsSelectedNames = {selectedToppings} 
                totalPrice = {price}/>
        )}
        </div>

        {activeStep === 1 ? (
            <div className="w-full flex flex-row justify-end">
                <Button
                    label="Next"
                    onClick={handleNext}
                    isDisabled = {isSizeButtonDisabled()}
                />
            </div>
        ): (
            <div className="w-full flex flex-row justify-between">
                <Button
                    label="Previous"
                    onClick={handlePrevious}
                />
                {activeStep === 3 ? (
                     <Button
                     label="Confirm"
                     onClick={handleConfirm}
                    />
                ) : (
                    <Button
                    label="Next"
                    onClick={handleNext}
                    isDisabled = {isToppingButtonDisabled()}
                />
                )}
            </div>
        )}
    </div>
  );
}
