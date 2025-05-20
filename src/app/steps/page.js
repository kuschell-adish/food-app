'use client'; 

import React, {useState} from 'react'; 
import { useRouter } from 'next/navigation';

import { supabase } from '../lib/supabaseClient';
import Stepper from '../components/stepper';
import Button from '../components/button';

import Size from './size/page';
import Topping from './topping/page';
import Order from './order/page';


export default function Page() {

    const router = useRouter();
    const [size, setSize] = useState(null);
    const [selectedToppings, setSelectedToppings] = useState([]);
    const [toppingsValue, setToppingsValue] = useState([]);
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
        return toppingsValue === false; 
    }

    const [isNextClicked, setIsNextClicked] = useState(false); 
    const [isPreviousClicked, setIsPreviousClicked] = useState(false); 

    const handleConfirm = async(e) => {
        e.preventDefault();
        try {
            const { data: orderData, error: orderError } = await supabase 
                .from('orders')
                .insert([{
                    size_id: size?.id,
                    status_id: 1, }]) //pending
                .select()
                .single(); 
            
            if (orderError) throw orderError;

            const orderId = orderData.id; 

            const toppingsData = selectedToppings.map(topping => ({
                order_id: orderId, 
                topping_id: topping.id
            })); 

            const { error: toppingsError } = await supabase 
                .from('order_toppings')
                .insert(toppingsData);
            
            if (toppingsError) throw toppingsError;

            console.log("successful"); 

            setTimeout(() => {
                router.push(`/steps/confirm?orderNumber=${orderId}`);
            }, 300);
        }
        catch(err) {
            console.error("Error:", err);
        }
    }

  return (  
    <div className={`w-full h-screen sm:p-10 p-7 flex flex-col transition-all duration-300 ease-in-out`}>
       <div className="mb-5">
            <Stepper 
                selectedSize={size} 
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                selectedToppings={selectedToppings}
                toppingState = {toppingsValue}
            />  
        </div>
        <div className={`flex-1 overflow-y-auto px-4 transition-all duration-300 ease-in-out ${isNextClicked && '-translate-x-full'} ${isPreviousClicked && 'translate-x-full'}`}>
        {activeStep === 1 ? (
            <Size
                selectedSize={size}
                setSelectedSize = {setSize}
            />
        ): activeStep === 2 ? (
            <Topping
                toppingsCount={size?.toppings_allowed}
                selectedToppings = {selectedToppings}
                setSelectedToppings = {setSelectedToppings}
                toppingState = {toppingsValue}
                setToppingState= {setToppingsValue}
            />
        ) : (
            <Order 
                sizeSelectedName = {size?.name}
                toppingsSelectedNames = {selectedToppings} 
                totalPrice = {size?.price}
            />
        )}
        </div>
        
        <div className="p-4">
        {activeStep === 1 ? (
            <div className="w-full flex justify-end">
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
    </div>
  );
}
