'use client'; 

import React, {useState, useEffect} from 'react'; 
import { useSearchParams } from 'next/navigation';

import { FaCheckCircle } from "react-icons/fa";

export default function Page() {
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    const orderNumberParam = searchParams.get('orderNumber');
    if (orderNumberParam) {
      setOrderNumber(orderNumberParam);
    }
  }, [searchParams]);

  return (  
    <div className="p-5 min-h-screen flex flex-col justify-center text-sm">
        <div className="flex flex-row gap-x-1 items-center">
            <img
              src="https://images.unsplash.com/vector-1739809596425-35fa340f2ab0?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="logo"
              className="h-8"
            />
            <p className="font-semibold text-custom-yellow md:text-lg tracking-wide">
              acai bowl co.
            </p>
        </div>
      <div className="flex flex-col gap-y-2 items-center justify-center flex-grow">
          <FaCheckCircle className="w-28 h-28 text-custom-red animate-bounce" />
          <p className="font-semibold text-base">Thank you for your order!</p>
          <p>
            Kindly show <span className="text-custom-red font-semibold">#{orderNumber}</span> to the server for your order number.
          </p>
      </div>
  </div>
  );
}
