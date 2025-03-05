'use client'; 

import React, {useState} from 'react'; 
import { useRouter } from 'next/navigation';

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

    const handleConfirm = (e) => {
        e.preventDefault();
        setIsConfirmClicked(true); 
        setTimeout(() => {
          router.push('/steps/confirm'); 
          setIsConfirmClicked(false); 
        }, 300);
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
