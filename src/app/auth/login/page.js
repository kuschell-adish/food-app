'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';

import Button from "@/app/components/button";
import { MdError } from "react-icons/md";

import { handleLogin } from "../../../app/api/auth/signInWithPassword"; 

export default function Page() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);
    const [eyeClicked, setEyeClicked] = useState(false);

    const router = useRouter();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const result = await handleLogin(email, password);

        if (result.success === true ) {
            router.push(`/auth/dashboard`);
        }
        else {
            console.error("error logging in:", result.message);
            setError(result.message)
        }
    };

    console.log(error); 

    useEffect(() => {
        if (error != "") {
            setShowError(true);
            setEmail("");
            setPassword("");
            const timer = setTimeout(() => {
                setShowError(false);
                setError("");  
            }, 3000);
            return () => clearTimeout(timer);
        }
    },[error]); 

    const handleEyeIcon = () => {
        setEyeClicked(prev => !prev);
    }
    
    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4 text-sm">
            <div className="flex flex-col items-center justify-center w-full max-w-md">
                <div className="flex flex-row gap-x-2 md:gap-x-1 items-center mb-2">
                    <img 
                        src="https://images.unsplash.com/vector-1739809596425-35fa340f2ab0?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                        alt="logo" 
                        className="h-8"
                    />
                    <p className="font-semibold text-custom-yellow text-base md:text-lg tracking-wide">
                        acai bowl co.
                    </p>
                </div>
                {showError && error!== "" && (<div className="bg-red-100 w-full rounded h-10 p-2 my-3 flex flex-row gap-x-2 items-center">
                    <MdError 
                    className="text-red-800 text-lg" />
                    <p>{error}</p>
                </div>)}
                <div className="w-full bg-white rounded-lg shadow-lg p-6 sm:p-8">
                    <h1 className="text-lg text-custom-red font-bold leading-tight tracking-tight mb-7">
                        Sign in to your account
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} >
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
                        <div>
                            <label htmlFor="password" className="block mb-2 font-semibold">Password</label>
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
                             <div className="flex justify-end mt-2">
                                <Link href="/auth/forgotPassword">
                                    <p className="font-medium text-custom-red hover:underline">
                                        Forgot password?
                                    </p>
                                </Link>
                            </div>
                        </div>

                        <Button 
                            type="submit"
                            label="Submit" 
                            className="w-full"/>
                    </form>
                </div>
            </div>
        </div>
    );
}
