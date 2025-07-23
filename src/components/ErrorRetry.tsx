import { RETRY_IMAGE } from "@/constants/constants";
import React from "react";
interface ErrorRetryProps {
    message: string;
    onRetry: () => void;
}

const ErrorRetry = ({ message, onRetry }: ErrorRetryProps) => {
    return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4 space-y-6">
            <div className="w-40 h-40 opacity-75">
                <img
                    src={RETRY_IMAGE}
                    alt="Error illustration"
                    className="w-full h-full object-contain"
                />
            </div>

            <p className="text-lg font-semibold text-gray-700">{message}</p>

            <button
                onClick={onRetry}
                className="flex cursor-pointer items-center gap-2 px-5 py-2 bg-red-600 text-white rounded-full shadow hover:bg-red-700 transition"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 11A9 9 0 0010 5.08V5a9 9 0 1010 10h-5"
                    />
                </svg>
                Try Again
            </button>
        </div>
    );
};

export default ErrorRetry;
