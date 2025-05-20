'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

import { supabase } from "@/app/lib/supabaseClient";
import { handleChangePassword } from "@/app/api/auth/changePassword";

import Button from "@/app/components/button";

import { MdError } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";

export default function Page() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);
    const [eyeClicked, setEyeClicked] = useState(false);

    const handleEyeIcon = () => {
        setEyeClicked(prev => !prev);
    };
    
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
                                <div className="absolute right-3 cursor-pointer text-lg font-semibold" onClick={handleEyeIcon}>
                                    {eyeClicked ? (
                                       <IoEyeOffOutline />
                                    ) : (
                                        <IoEyeOutline />
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
