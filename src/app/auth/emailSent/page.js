'use client';

import React from "react";
import Link from "next/link";

export default function Page() {
    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4 text-sm">
            <div className="flex flex-col items-center justify-center w-full max-w-md">
                <div className="w-full bg-white rounded-lg shadow-lg p-6 sm:p-8 flex flex-col gap-y-4">
                    <h1 className="text-lg text-custom-red font-bold leading-tight tracking-tight">
                        Email has been successfully sent!
                    </h1>
                    <p>If your account is registered with Acai Bowls Co., you will receive an email shortly on how to reset your password. </p>
                    <div className="flex flex-row gap-x-1">
                        <p>Did not receive an email?</p>
                        <Link href="/auth/forgotPassword">
                            <p className="font-medium text-custom-red hover:underline">
                                Generate a new one.
                             </p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
