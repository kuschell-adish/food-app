'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
 
import Button from "@/app/components/button";
import { MdError } from "react-icons/md";

import { handleChangePassword } from "../../../app/api/auth/changePassword";

import { supabase } from "@/app/lib/supabaseClient";


export default function Page() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);

    const router = useRouter();
    
    const handleSubmit = async(e) => {
        e.preventDefault();

        const result = await handleChangePassword(password);

        if (result.success === true) {
            await supabase.auth.signOut();
            router.push(`/auth/login`);
        }
        else {
            console.error("error logging in:", result.message);
            setError(result.message)
        }
    };

    useEffect(() => {
        if (error != "") {
            setShowError(true);
            const timer = setTimeout(() => {
                setShowError(false);
                setError("");  
            }, 3000);
            return () => clearTimeout(timer);
        }
    },[error]); 
    const [eyeClicked, setEyeClicked] = useState(false);
    const handleEyeIcon = () => {
        setEyeClicked(prev => !prev);
    }
    
    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4 text-sm">
            <div className="flex flex-col items-center justify-center w-full max-w-md">
                {showError && error!== "" && (<div className="bg-red-100 w-full rounded h-10 p-2 my-3 flex flex-row gap-x-2 items-center">
                    <MdError 
                    className="text-red-800 text-lg" />
                    <p>{error}</p>
                </div>)}
                <div className="w-full bg-white rounded-lg shadow-lg p-6 sm:p-8">
                    <h1 className="text-lg text-custom-red font-bold leading-tight tracking-tight mb-7">
                        Update your password
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="password" className="block mb-2 font-semibold">New Password</label>
                            <div className="relative flex items-center">
                                <input 
                                    type={eyeClicked ? "text" : "password"}
                                    name="password" 
                                    id="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 rounded-lg block w-full p-2.5 pr-10" 
                                    placeholder="Enter your password" 
                                    required
                                />
                                <div className="absolute right-3 cursor-pointer" onClick={handleEyeIcon}>
                                    {eyeClicked ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                        </div>
                        <Button 
                            type="submit"
                            label="Update Password" 
                            className="w-full"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}
