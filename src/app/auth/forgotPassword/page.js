'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
 
import { handleForgotPassword } from "@/app/api/auth/forgotPassword"; 
import Button from "@/app/components/button";
import { MdError } from "react-icons/md";

export default function Page() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const result = await handleForgotPassword(email);

        if (result.success === true) {
            router.push(`/auth/emailSent`);
        }
        else {
            console.error("error logging in:", result.message);
            setError(result.message)
        }
    };

    useEffect(() => {
        if (error != "") {
            setShowError(true);
            setEmail("");
            const timer = setTimeout(() => {
                setShowError(false);
                setError("");  
            }, 3000);
            return () => clearTimeout(timer);
        }
    },[error]); 
    
    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4 text-sm">
            <div className="flex flex-col items-center justify-center w-full max-w-md">
                {showError && error!== "" && (
                    <div className="bg-red-100 w-full rounded h-10 p-2 my-3 flex flex-row gap-x-2 items-center">
                        <MdError 
                            className="text-red-800 text-lg" 
                        />
                        <p>{error}</p>
                    </div>
                )}
                <div className="w-full bg-white rounded-lg shadow-lg p-6 sm:p-8">
                    <h1 className="text-lg text-custom-red font-bold leading-tight tracking-tight mb-7">
                        Reset your password
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block mb-2 font-semibold">Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-gray-50 border border-gray-300 rounded-lg block w-full p-2.5" 
                                placeholder="Enter your email" 
                                required
                            />
                        </div>
                        <Button 
                            type="submit"
                            label="Send Reset Link" 
                            className="w-full"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}
