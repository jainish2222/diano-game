"use client";
import React from "react";

export default function TransactionStatus({ 
  open, 
  status, 
  title, 
  description, 
  onClose 
}) {

  if (!open) return null;

  // Color based on status
  const statusStyles = {
    verified: "bg-green-500",
    pending: "bg-yellow-500",
    failed: "bg-red-500"
  };

  const statusText = {
    verified: "Verified",
    pending: "Pending",
    failed: "Failed"
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 text-center">
      <div className="bg-white text-black dark:bg-neutral-900 dark:text-white w-80 rounded-2xl p-6 shadow-xl">
        
        {/* Status Badge */}
        <div 
          className={`w-fit px-3 py-1 rounded-full text-sm font-semibold text-white mb-4 mx-auto ${statusStyles[status]}`}
        >
          {statusText[status]}
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold mb-2">{title}</h2>

        {/* Description */}
        <p className="opacity-80 mb-5 leading-relaxed text-sm">
          {description}
        </p>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-2 bg-black text-white rounded-lg dark:bg-white dark:text-black transition active:scale-95"
        >
          Close
        </button>

      </div>
    </div>
  );
}
