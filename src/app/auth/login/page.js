'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
 
import { auth } from "@/app/lib/firebaseConfig";
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "@firebase/auth";

import Button from "@/app/components/button";
import { MdError } from "react-icons/md";

export default function Page() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false); 
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);

    const router = useRouter();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            //remember me checked
            if (rememberMe) {
                await setPersistence(auth, browserSessionPersistence); 
            }

            //login
            await signInWithEmailAndPassword(auth, email, password);

            //console user object
            auth.onAuthStateChanged((user) => {
                if (user) {
                  console.log("user object:", user);
                  router.push('/auth/dashboard');
                } else {
                  console.log("no user");
                }
              });
        }
        catch(err) {
            if (err.code === 'auth/invalid-credential' ) {
                setError("Invalid credentials.");
            }
            else {
                console.error("error logging in:", err);
                setError("An error occurred. Please try again.");
            }
        }
    };

    console.log(rememberMe); 

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
                        <div>
                            <label htmlFor="password" className="block mb-2 font-semibold">Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                id="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-gray-50 border border-gray-300 rounded-lg block w-full p-2.5" 
                                placeholder="Enter your password" 
                                required
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input 
                                    id="remember" 
                                    type="checkbox" 
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                                />
                                <label htmlFor="remember" className="ml-2">Remember me</label>
                            </div>
                            <Link href="/auth/forgotPassword">
                                <p className="font-medium text-custom-red hover:underline">
                                    Forgot password?
                                </p>
                            </Link>
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
